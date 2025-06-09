using System.Windows;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.IO;


namespace HotelRezervacije
{
    public static class MenadzerResursa
    {
        public static string IkonicaPromeniSliku = "slike/ikonica_promeni_sliku.png";
        public static string NemaSlike = "slike/nema_slike.png";
        public static FontFamily UnikodFont = (FontFamily)Application.Current.Resources["UnikodFont"];

        public static ImageSource IzvorOdImenaDatoteke(string imeDatoteke)
        {
            if (File.Exists(imeDatoteke))
            {
                byte[] bajtovi = File.ReadAllBytes(imeDatoteke);
                return IzvorOdNizaBajtova(bajtovi);
            }
            return null;
        }

        public static ImageSource IzvorOdNizaBajtova(byte[] nizBajtova)
        {
            if (nizBajtova != null)
            {
                using (var ms = new MemoryStream(nizBajtova))
                {
                    BitmapImage bitmapSlika = new BitmapImage();
                    bitmapSlika.BeginInit();
                    bitmapSlika.CacheOption = BitmapCacheOption.OnLoad;
                    bitmapSlika.StreamSource = ms;
                    bitmapSlika.EndInit();
                    return bitmapSlika;
                }
            }
            return null;
        }
    }
}