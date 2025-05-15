// PrimeFinder.java
public class PrimeFinder {

    public static void main(String[] args) {
        int totalRange = 99999;
        int step = 10000;
        int threadCount = (int) Math.ceil((double) totalRange / step);

        for (int i = 0; i < threadCount; i++) {
            int start = i * step + 1;
            int end = Math.min((i + 1) * step, totalRange);
            Thread thread = new Thread(new PrimeTask(i, start, end));
            thread.start();
        }
    }
}

class PrimeTask implements Runnable {
    private final int id;
    private final int start;
    private final int end;

    public PrimeTask(int id, int start, int end) {
        this.id = id;
        this.start = start;
        this.end = end;
    }

    @Override
    public void run() {
        for (int number = start; number <= end; number++) {
            if (isPrime(number)) {
                System.out.println(id + ": " + number);
            }
        }
    }

    private boolean isPrime(int num) {
        if (num <= 1) return false;
        if (num == 2) return true;
        if (num % 2 == 0) return false;

        int sqrt = (int) Math.sqrt(num);
        for (int i = 3; i <= sqrt; i += 2) {
            if (num % i == 0) return false;
        }
        return true;
    }
}
