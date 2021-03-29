#include <bits/stdc++.h>

using namespace std;

int main()
{
	ios::sync_with_stdio(0);
	cin.tie();

	int t = 0;
	cin >> t;

	while (t--)
	{
		string s;
		cin >> s;
		bool finished = false;

		while (1)
		{
			//cout << s << "\n";

			int x = 0;
			for (int i = 0; i < s.length() - 1; i++)
			{
				char c1 = s[i];
				char c2 = s[i + 1];
				if (c1 == 'A' && c2 == 'B')
				{
					s.erase(i, 2);
					x = 1;
					break;
				}
			}
			if (x == 0 || s == "")
				break;
		}

		if (s != "")
		{
			while (1)
			{
				//cout << s << endl;

				int x = 0;
				for (int i = 0; i < s.length() - 1; i++)
				{
					char c1 = s[i];
					char c2 = s[i + 1];
					if (c1 == 'B' && c2 == 'B')
					{
						s.erase(i, 2);
						x = 1;
						break;
					}
				}
				if (x == 0 || s == "")
					break;
			}
		}
		cout << s.length() << endl;
	}
}
