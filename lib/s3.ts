
import "server-only";

import {
  S3Client,
  GetObjectCommand,
  paginateListObjectsV2,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "eu-north-1",
});

const bucket = process.env.S3_BUCKET!;

export async function lerPopulacaoS3() {
  const prefixo = process.env.S3_DEMO_POP_PREFIX!;

  const dados: Record<string, unknown>[] = [];

  const paginas = paginateListObjectsV2(
    { client: s3 },
    { Bucket: bucket, Prefix: prefixo }
  );

  for await (const pagina of paginas) {
    for (const objeto of pagina.Contents ?? []) {
      const key = objeto.Key;

      if (
        !key ||
        key.endsWith("/") ||
        key.endsWith(".metadata") ||
        key.endsWith("-manifest.csv")
      ) {
        continue;
      }

      const resposta = await s3.send(
        new GetObjectCommand({
          Bucket: bucket,
          Key: key,
        })
      );

      if (!resposta.Body) continue;

      const conteudo = await resposta.Body.transformToString();

      // Athena UNLOAD: um objeto JSON por linha
      for (const linha of conteudo.split(/\r?\n/)) {
        if (!linha.trim()) continue;

        //converte para nulos
        const linhaCorrigida = linha.replace(
          /:\s*NaN(?=\s*[,}])/g,
          ":null"
        );

        dados.push(JSON.parse(linhaCorrigida));
      }
    }
  }

  return dados;
}
