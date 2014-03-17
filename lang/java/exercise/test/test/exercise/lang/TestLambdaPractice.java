package test.exercise.lang;

import java.util.*;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import exercise.lang.Func;
import exercise.lang.AccFunc;
import static exercise.lang.LambdaPractice.*;

public class TestLambdaPractice {

	public TestLambdaPractice() {
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
	public void map_受け取ったリストの各要素に何らかの関数を適用した結果を返す() {
		List<Integer> nums = new ArrayList<>();

		nums.add(1);
		nums.add(2);
		nums.add(3);

		Func<Integer, Integer> square = (num) -> {
			return num * num;
		};

		List<Integer> actual = map(nums, square);

		List<Integer> expected = new ArrayList<>();
		expected.add(1);
		expected.add(4);
		expected.add(9);

		assertThat(actual, is(expected));
	}

	@Test
	public void reduce_受け取ったリストの各要素に関数を適用しその結果をまとめて返す() {
		List<Integer> nums = new ArrayList<>();

		nums.add(1);
		nums.add(2);
		nums.add(3);

		AccFunc<Integer, Integer> multi = (num, acc) -> {
			if(acc == null){
				acc = 1;
			}
			return acc * num;
		};

		Integer actual = reduce(nums, multi);
		Integer expected = 1 * 2 * 3;

		assertThat(actual, is(expected));
	}
}