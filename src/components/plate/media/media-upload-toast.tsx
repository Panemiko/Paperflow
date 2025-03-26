"use client";

import { useEffect } from "react";

import { PlaceholderPlugin, UploadErrorCode } from "@udecode/plate-media/react";
import { usePluginOption } from "@udecode/plate/react";
import { toast } from "sonner";

export const useUploadErrorToast = () => {
  const uploadError = usePluginOption(PlaceholderPlugin, "error");

  useEffect(() => {
    if (!uploadError) return;

    const { code, data } = uploadError;

    switch (code) {
      case UploadErrorCode.INVALID_FILE_SIZE: {
        toast.error(
          `O tamanho dos arquivos ${data.files
            .map((f) => f.name)
            .join(", ")} é inválido`,
        );

        break;
      }
      case UploadErrorCode.INVALID_FILE_TYPE: {
        toast.error(
          `O tipo dos arquivos ${data.files
            .map((f) => f.name)
            .join(", ")} é inválido`,
        );

        break;
      }
      case UploadErrorCode.TOO_LARGE: {
        toast.error(
          `O tamanho dos arquivos ${data.files
            .map((f) => f.name)
            .join(", ")} é maior que ${data.maxFileSize}`,
        );

        break;
      }
      case UploadErrorCode.TOO_LESS_FILES: {
        toast.error(
          `A quantidade mínima de arquivos é ${data.minFileCount} para ${data.fileType}`,
        );

        break;
      }
      case UploadErrorCode.TOO_MANY_FILES: {
        toast.error(
          `A quantidade máxima de arquivos é ${data.maxFileCount} ${
            data.fileType ? `para ${data.fileType}` : ""
          }`,
        );

        break;
      }
    }
  }, [uploadError]);
};

export const MediaUploadToast = () => {
  useUploadErrorToast();

  return null;
};
