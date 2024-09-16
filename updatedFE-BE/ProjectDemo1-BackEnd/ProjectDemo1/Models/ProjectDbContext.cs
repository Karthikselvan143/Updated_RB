using Microsoft.EntityFrameworkCore;

namespace ProjectDemo1.Models
{
    public class ProjectDbContext:DbContext
    {

        public ProjectDbContext(DbContextOptions<ProjectDbContext> options) : base(options) { }


        public DbSet<User> Users { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<RoomService> roomServices { get; set; }
        public DbSet<PaymentTransaction> PaymentTransactions { get; set; }

        public DbSet<DatePicker> DatePickers { get; set; }
        public DbSet<Booking> bookings { get; set; }

        public DbSet<DatePickerDetails> DatePickerDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.DatePickerDetails)
                .WithOne(d => d.Booking)
                .HasForeignKey<DatePickerDetails>(d => d.BookingId);
        }
    }
}
