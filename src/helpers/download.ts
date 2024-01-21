import {frontendApi} from "@/helpers/api";

export async function downloadAnalysisFile(analysis_id: number) {
  const url = await frontendApi.get<Api.Response<string>>(`/analysis/${analysis_id}/download_file`)
    .then(res => res.data.data);
  download(url, "download.executable");
}

export async function downloadAnalysisData(analysis_id: number) {
  const data = await frontendApi.get<Api.Response<Application.FullAnalysis>>(`/analysis/${analysis_id}`)
    .then(res => res.data.data);
  const blob = new Blob([JSON.stringify(data)]);
  const url = URL.createObjectURL(blob)
  download(url, "export.json");
  URL.revokeObjectURL(url);
}

export function download(url: string, filename: string) {
  console.log(url);
  const a = document.createElement("a");
  a.download = filename;
  a.href = url;
  a.click();
}
