#!/usr/bin/python3
# -*- coding: utf-8 -*-

import cgi

import moglabo.pychalle.linear as lr

def get_test_points():
	'''
	Return test points.
	This points used geometry calculattion.
	'''	
	testps = '''
	{
		"0" : [120,100],
		"1" : [300, 50],
		"2" : [10, 400],
		"3" : [100, 60],
		"4" : [400, 350],
		"length" : 5
	}
	'''
	
	return testps

def get_test_segments():
	'''
	Return test segments.
	This segments used geometry calculattion.
	'''	
	segments = '''
	{
		"0" : [25,25, 0],
		"1" : [5, 200, 1],
		"2" : [10, 450, 1],
		"3" : [550, 300, 1],
		"4" : [400, 100, 1],
		"5" : [400, 350, 4],
		"length" : 6
	}
	'''
	
	return segments

def testprint():
	'''
	Test print for checking cgi and loading module.
	'''
	v1 = lr.Vector([1,0,1])
	v2 = lr.Vector([0,2,0])
	v3 = lr.Vector([-1,0,1])
	m1 = lr.Matrix([v1,v2,v3])
	
	return str(m1)

def get_calc_func(typekey):
	CALC_TYPES = {
		"testpoint" : get_test_points,
		"testpolygon" : get_test_segments
	}
	
	return CALC_TYPES[typekey]

#Get function for calculation.
form = cgi.FieldStorage()
calc_type = form.getvalue("type")
func = get_calc_func(calc_type)

#Response to client.
print("Content-type: application/json; charset=UTF-8\n")
print(func())


