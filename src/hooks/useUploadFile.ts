import React from "react";
import {TabsContext} from "@/components/TabsProvider";
import {useRouter} from "next/navigation";
import {frontendApi} from "@/helpers/api";

export default function useUploadFile() {
    const {createTab} = React.useContext(TabsContext);
    const router = useRouter();

    return React.useCallback(async (file: File) => {
        const fd = new FormData();
        fd.append("file", file);
        const res = await frontendApi.post<Api.Response<Application.Analysis>>("/upload", fd);
        const newTab = {
            analysisId: res.data.data.id.toString(),
            filename: res.data.data.filename,
        }
        createTab(newTab);
        router.push(`/analysis/${newTab.analysisId}`);
    }, [createTab, router]);
}
