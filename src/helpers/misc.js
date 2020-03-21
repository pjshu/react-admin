export async function getImageForm(blobUrl) {
  const form = new FormData();
  const blob = await fetch(blobUrl).then(r => r.blob());
  form.append('image', blob);
  return form;
}
