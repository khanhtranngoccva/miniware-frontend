import React from "react";
import api from "@/helpers/api";

export const getAnalysis = React.cache(async function (id: string) {
  return await api.get<Api.Response<Application.FullAnalysis>>(`/analysis/${id}`).then(res => res.data.data);
});
