/** */
export const getFormattedDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
