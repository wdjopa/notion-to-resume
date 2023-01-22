// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { formatDatas, getUserInfosFromUrl } from "@/helpers/notion";
import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";
dotenv.config();

export async function getData(websiteUrl) {
  try {
    const { result, error } = await getUserInfosFromUrl({ websiteUrl });
    if (result) {
      const { duplicated_template_id, access_token, bot_id } =
        result.properties;
      const page_id = duplicated_template_id.rich_text[0].text.content;
      const access_token_value = access_token.rich_text[0].text.content;
      const bot_id_value = bot_id.rich_text[0].text.content;
      const notion = new Client();
      const response = await notion.pages.retrieve({
        page_id: page_id,
        auth: `${access_token_value}`,
      });
      const formatted_datas = await formatDatas({
        page: response,
        access_token: access_token_value,
      });
      return formatted_datas;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export default async function handler(req, res) {
  const {
    query: { websiteUrl },
  } = req;
  const jsonData = await getData(websiteUrl);
  res.status(200).json(jsonData);
}
