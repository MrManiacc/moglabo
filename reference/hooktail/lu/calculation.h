#ifndef __CALCULATION_H_INCLUDED__
#define __CALCULATION_H_INCLUDED__

typedef struct{
	int height;
	int width;
	double *a;
}Matrix;

Matrix *CreateMatrix(int width, int height);
void FreeMatrix(Matrix* matrix);

//LU$BJ,2r!#9TNs(Bm$B$r2<;03Q9TNs$H>e;03Q9TNs$KJ,2r%Y%/%H%k(Bv$B$O9T$r8r49$9$k$H$-$K9g$o$;$F8r49$9$k!#(B
int* LU(Matrix* m);
#endif /* __CALCULATION_H_INCLUDED__ */
