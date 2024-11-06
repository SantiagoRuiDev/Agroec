export function formatDateTime(dateString) {
    const date = new Date(dateString);
    
    // Formato de hora: hora:minuto AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // El '0' se convierte en '12'
    const time = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
    
    // Nombres de los meses en español
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    // Corrección del mes en plainDate
    const yearMonthDay = `${year}/${date.getMonth() + 1}/${day}`;
    const plainDate = `${day}/${date.getMonth() + 1}/${year}`;
    
    // Formato de fecha: "10 de Septiembre de 2024"
    const formattedDate = `${day} de ${month} de ${year}`;

    const orderDate = `${month} ${day}, ${year}`;

    const dayAndMonth = `${month} ${day}, ${year}`;
    
    const hoursAndMinutes = `${hours}:${minutes}`;
    
    const whenMessageSent = (new Date().getDate() == date.getDate()) ? "Hoy" : plainDate;
    
    return { time, formattedDate, whenMessageSent, dayAndMonth, hoursAndMinutes, orderDate, plainDate, yearMonthDay };
}
export function formatWalletDate(dateString) {
    const date = new Date(dateString);

    // Formato de fecha: DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
    const year = date.getFullYear();

    // Formato de hora: HH:mm (formato 24 horas)
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Combinar fecha y hora
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
}
