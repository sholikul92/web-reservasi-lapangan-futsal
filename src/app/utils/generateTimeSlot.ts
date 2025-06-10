export function generateTimeSlots(startHour: number, endHour: number) {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    const formatted = hour.toString().padStart(2, "0") + ":00";
    slots.push(formatted);
  }
  return slots;
}
