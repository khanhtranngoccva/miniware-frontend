import React from "react";
import {TabsContext} from "@/components/TabsProvider";
import {useRouter} from "next/navigation";
import api from "@/helpers/api";

export default function useUploadFile() {
  const {createTab} = React.useContext(TabsContext);
  const router = useRouter();

  return React.useCallback(async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await api.post<Api.Response<Application.AnalysisIntent>>("/upload", fd);
    const newTab = {
      analysisId: res.data.data.id,
      filename: res.data.data.filename,
    }
    createTab(newTab);
    router.push(`/analysis/${newTab.analysisId}`);
  }, []);
}
