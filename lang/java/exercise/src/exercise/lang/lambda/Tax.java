package exercise.lang.lambda;

public interface Tax {
	double getRate();
	
	default int on(Taxable t){
		return (int)(t.getAmount() * (1 + getRate()));
	}
}
