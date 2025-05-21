export default async function autocompleteLeadData(text: string) {
  const res = await fetch("/api/ai/lead-data-autocomplete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  const { suggestion } = await res.json();
  return suggestion;
}