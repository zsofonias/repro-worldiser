export const formatDate = (date: string | Date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    // weekday: 'long',
  }).format(new Date(date));
