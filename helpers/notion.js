import { Client } from "@notionhq/client";
import * as dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const notion_api = "https://api.notion.com/v1";

export async function getUserInfosFromUrl({ websiteUrl }) {
  try {
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!websiteUrl) {
      return { error: "website url is not provided" };
    }
    const response = await axios.post(
      `${notion_api}/databases/${databaseId}/query`,
      {
        filter: {
          property: "resume_url",
          rich_text: {
            equals: websiteUrl,
          },
        },
        sorts: [
          {
            property: "UUID",
            direction: "ascending",
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_KEY}`,
          "Content-Type": "application/json",
          "Notion-Version": "2022-06-28",
        },
      }
    );
    const result = response.data.results[0];
    if (result) {
      return { result };
    }
  } catch (error) {
    return { error: error.response.data };
  }
}

function extractValue(property) {
  switch (property.type) {
    case "url":
    case "email":
    case "phone_number":
      return property[property.type] || null;
    case "rich_text":
    case "title":
      return property[property.type] || null;
    case "date":
      return property.date || null;
    case "file":
      return {
        name: property.name || null,
        url: property.file?.url || property.external?.url || null,
      };
    case "files":
      return extractValue(property.files?.[0])?.url || null;
    default:
      return property[property.type] || null;
  }
}
export async function formatDatas({ page, access_token }) {
  let structured_datas = {
    about: null,
    education: null,
    portfolio: null,
    work_experience: null,
    references: null,
  };
  const notion = new Client();
  const response = await notion.blocks.children.list({
    block_id: page.id,
    auth: access_token,
  });
  const databases = response.results.filter(
    (item) => item.type === "child_database"
  );
  //   console.log({ response: response.results, databases });
  for (let database of databases) {
    let databaseContent = await notion.databases.query({
      database_id: database.id,
      auth: access_token,
    });
    if (database.child_database.title === "about") {
      let about = databaseContent.results[0];
      if (about) {
        let properties = Object.keys(about.properties).map((name) => ({
          name,
          value: extractValue(about.properties[name]),
        }));

        structured_datas = {
          ...structured_datas,
          about: {
            name: properties.find((p) => p.name === "Name").value,
            profilePicture: extractValue(about.icon)?.url || null,
            properties,
          },
        };
        console.log({ structured_datas: JSON.stringify(structured_datas) });
      }
    }
  }

  return structured_datas;
}
