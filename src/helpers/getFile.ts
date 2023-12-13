export function getFile(parameters?: {
  accept?: string
}): Promise<File> {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = parameters?.accept ?? "";
  input.multiple = false;
  input.click();

  return new Promise((resolve, reject) => {
    function accept() {
      clear();
      const file = input.files?.[0];
      if (!file) reject(Error("The input failed to capture a file."));
      else resolve(file);
    }

    function cancel() {
      clear();
      reject(new Error("The user canceled the file input operation."));
    }

    function clear() {
      input.removeEventListener("change", accept);
      input.removeEventListener("cancel", cancel);
    }

    input.addEventListener("change", accept);
    input.addEventListener("cancel", cancel);
  });
}

