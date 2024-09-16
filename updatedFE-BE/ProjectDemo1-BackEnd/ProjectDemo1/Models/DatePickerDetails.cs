namespace ProjectDemo1.Models
{
    public class DatePickerDetails
    {
        public int Id { get; set; }
        public string Location { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int BookingId { get; set; }
        public Booking Booking { get; set; }
    }
}
