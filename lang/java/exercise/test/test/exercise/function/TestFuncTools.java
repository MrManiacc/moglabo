package test.exercise.function;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;

import exercise.function.FuncTools;

public class TestFuncTools {
	
	public TestFuncTools() {
	}
	
	@BeforeClass
	public static void setUpClass() {
	}
	
	@AfterClass
	public static void tearDownClass() {
	}
	
	@Before
	public void setUp() {
	}
	
	@After
	public void tearDown() {
	}

	@Test
	public void fibはフィボナッチ数列を計算する() {
		int n = 10;
		
		int actual = FuncTools.fib(n);
		int expected = 55;
		
		assertThat(actual, is(expected));
	}
}
