#include <stdio.h>
#include <stdlib.h>
#include <malloc.h>
#include <string.h>

#define FAIL 1
#define SUCCESS 0

int fact(int n)
{
    if (n == 1)
        return 1;
    return n * fact(n - 1);
}

int countZeros(int *v, int dim)
{
    int count = 0;
    for (int i = 0; i < dim; i++)
    {
        if (v[i] == 0)
            count++;
    }

    return count;
}

int countNull(int *v, int dim, int i, int* zero)
{
    if (i == dim)
        return *(zero);
    if (v[i] == 0)
        (*zero) ++;
    return countNull(v, dim, i + 1, zero);
}

int main(int argc, char **argv)
{
    // int a;
    // int *p;
    // printf("a=%d, 0x%x \n", a, p);
    // a=4;
    // printf("a=%d, 0x%x \n", a, p);
    // *p=3;
    // printf("a=%d, 0x%x \n", a, p);

    //PROVA STRINGHE
    // char s1[6] = {'p','i','p','p','o','\0'};
    // char s2[] = "pippo";
    // char s3[] = "abcde";
    // strcpy(s3, "z");
    // char *s4 = "ciao";
    // // strcpy(s4, "z");

    // int i = 5;
    // int* a = &i;
    // int** b = &a;

    // printf("%d ", **b);

    // printf("%d %s \n", strlen(s1), s1);
    // printf("%d %s \n", strlen(s2), s2);
    // printf("%d %s \n", strlen(s3), s3);
    // printf("%d %s \n", strlen(s4), s4);

    //printf("%s",v[0]);

    // WATCH OUT: variables are stored in the stack in order or in reversed order
    // depending on numerous facts (compiler, ...), so please do NOT consider
    // modifing a varible starting (increasing/decreasing) from the address of
    // another variable declared before/after it
    // char c;
    // char d;
    // char* p;

    // printf("\nindirizzi\n");
    // printf("c %x\n", &c);
    // printf("d %x\n", &d);
    // printf("p %x\n", &p);

    // c = 'C';
    // d = 'D';
    // p = &c;

    // printf("\nindirizzi puntati\n");
    // printf("p %x\n", p);
    // printf("p+1 %x\n", p+1);
    // printf("p-1 %x\n", p-1);

    // printf("\nvalori\n");
    // printf("c %c\n", c);
    // printf("d %c\n", d);

    // *p = 'E';
    // *(p-1)='F';

    // printf("\nvalori cambiati\n");
    // printf("c %c\n", c);
    // printf("d %c\n", d);

    // char b;
    // char c[5] = {'a', 'b', 'c', 'd'};
    // printf("&b %x\n", &b);
    // printf("c %x\n", c);
    // printf("Secondo elemento dell'array: %c\n", c[1]);
    // printf("Secondo elemento dell'array: %c\n", *(c + 1));

    // int v[] = {4, 2, 8, 5, 2};
    // // Queste due scritture sono equivalenti
    // printf("Secondo elemento dell'array: %d\n", v[1]);
    // printf("Secondo elemento dell'array: %d\n", *(v + 1));

    //printf("%d", fact(atoi(argv[1])));
    // int dim = 11;
    // int *a;
    // for (int i = 0; i < dim; i++)
    // {
    //     *(a + i) = 0;
    // }
    // // printf("%d", countZeros(a, dim));
    // int z = 0;
    // printf("%d", countNull(a, dim, 0, &z));

    // char s[5];
    // s[0] = 'a';
    // s[1] = 'b';
    // s[2] = 'c';
    // s[3] = 'd';
    // s[4] = 0;
    // strcpy(s, "we");
    // printf("%d", s[2]);

    float f = 1.75;
    int x = f/2;

    printf("%d",x);


    return 0;
}