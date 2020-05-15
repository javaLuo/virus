import axios from "axios";

export async function download(src, fileName) {
  const link = document.createElement("a");

  if ("download" in link) {
    link.download = fileName;
    link.style.display = "none";
    link.href = src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } else {
    try {
      const res = await axios({
        method: "get",
        url: src,
        responseType: "arraybuffer",
      });
      const blob = new Blob([res.data]);
      navigator.msSaveBlob(blob, fileName);
    } catch (e) {
      console.log("error:", e);
    }
    return true;
  }
}
