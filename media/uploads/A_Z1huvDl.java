public class A {
  public static long money;
  public static long stocks;
  public static boolean justbought;

  public static void main(String[] arg) {
    Kattio io = new Kattio(System.in, System.out);
    stocks = 0;
    money = 100;

    long days = io.getLong();

    if (days == 1) {
      io.println(money);
      io.flush();
      return;
    }

    long price = io.getLong();

    for(int i = 0; i < days-1; i++){
      long nextprice = io.getLong();

      if(nextprice > price){
        if(stocks == 100000 || justbought == true){
          // do nothing
        }
        else {
          buy(price);
          io.println("buy at " + price + " total stocks: " + stocks);
          justbought = true;
        }
      }

      else if(nextprice < price){
        sell(price);
        justbought = false;
      }

      else{
        //Do nothing
      }

      price = nextprice;
    }

    sell(price);

    io.println(String.valueOf(money));
    io.close();
  }

  static void buy(long price){
    long leftovermoney = money % price;
    stocks = money / price;
    money = 0 + leftovermoney;
    if(stocks > 100000){
      sell(price, (stocks - 100000));
    }
  }

  static void sell(long price){
    money += price * stocks;
    stocks = 0;
  }

  static void sell(long price, long amount){
    money += price * amount;
    stocks -= amount;
  }
}
