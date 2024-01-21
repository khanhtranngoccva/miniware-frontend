import React from "react";
import {privateApi} from "@/helpers/api";

export const getAnalysis = React.cache(async function (id: string) {
  return await privateApi.get<Api.Response<Application.FullAnalysis>>(`/analysis/${id}`).then(res => res.data.data);
});
