import React, { useState } from "react";
import axios from "axios";
import { Card, Image } from "@mantine/core";

export default function Cloud() {
  const [glist, setGlist] = useState([]);
  console.log("Test");
  const fetchFilesFromDirectory = async (directoryLink, apiKey) => {
    try {
      const folderId = extractFolderIdFromLink(directoryLink);
      const filesUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`;

      const response = await axios.get(filesUrl);
      setGlist(response.data.files);
    } catch (error) {
      console.error("Error fetching files:", error);
      return [];
    }
  };

  const extractFolderIdFromLink = (link) => {
    const url = new URL(link);
    const folderId = url.searchParams.get("id");
    return folderId;
  };

  if (glist.length == -1) {
    fetchFilesFromDirectory(
      "https://drive.google.com/drive/folders/1_qOJ0z3kI_e2IJq4X6HqF0T1ROBESygS",
      "AIzaSyArhAwJMwe8C-BwJsFNxvN9HiYFbOyUF0U"
    );
  }
  
  if(glist.length==0){
    setGlist([
        "https://drive.google.com/uc?export=view&id=1yHsjVS3hkgn-MT-rODH6ZTIjRk6tSGCl",
        "https://drive.google.com/uc?export=view&id=1-97c3UZtOuNffks-niuMGYm0JYyi4HBz",
        "https://drive.google.com/uc?export=view&id=1BNedrZYq1JRWgI8Pkl44bsr0Odkf-HWm",
        "https://drive.google.com/uc?export=view&id=1d74MB5DGdYKg6Y4vJoA2f2bNiKaiMgDv",
        "https://drive.google.com/uc?export=view&id=1WP9M1A4XIXLxNZXT2oWjmCcNlanmS2M3",
        "https://drive.google.com/uc?export=view&id=1DJeH7tNl0icS9gMjl_WZZFMLPSdxo4aj",
        "https://drive.google.com/uc?export=view&id=1-NuLKwYew3m90EmSW20LirKHDWOjKAJ0",
        "https://drive.google.com/uc?export=view&id=1ovbxWBzAZKg2J1A12y2sljbse1dJJHrT",
        "https://drive.google.com/uc?export=view&id=1YQF_buOJGXpctEe__CfPPNPBT1RT4gy1",
        "https://drive.google.com/uc?export=view&id=1eWa0m_AsqiteYtqk4H4TPIFjdax8vxOv",
        "https://drive.google.com/uc?export=view&id=1p2ib0pCM5xXkjZtA70zjFsIGHlwVmmNa",
        "https://drive.google.com/uc?export=view&id=1HkGRW1AnLuv78zC37L-4OLPFrUvKsK7j",
        "https://drive.google.com/uc?export=view&id=1vDP-vOnFv-XvGOQtjsloShqJvZwC3shE",
        "https://drive.google.com/uc?export=view&id=1IxljFOOfpC9LYMhMi41Yzp9tv4J8CSy-",
        "https://drive.google.com/uc?export=view&id=1f5gqwqFSJHGh9hIGSLCSL0z1W8GYQzQI",
      ]);
  }

  console.log("glist------------------>", glist);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
      {
        //map on list
        glist?.map((el) => {
          return (
            <div>
                <img height={"300px"} width={"250px"} style={{margin: "10px",borderRadius: "5px",border: "2px solid #ccc",boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"}} src={el}></img>
            </div>
          );
        })
      }
    </div>
  );
}
