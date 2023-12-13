# Tic Tac Toe
In this project, weare going to build the `Tic Tac Toe` game using HTML, CSS and JS.

### Rules-
The game has 2 players each having `O` and `X` representing them.
There will be a square divided into 9 equal squares/cells.
|  |  |  |
| --- | --- | --- |
|_ | _ | _ |
|_ | _ | _ |
|_ | _ | _ |

The players take turns to fill each cell with their respective symbol.
Whoever first fills their symbol in 3 consecutive cells linearly (horizontal, vertical, diagonal) wins.

##### Example-

| | | |
|-|-|-|
|O|X|O|
|X|X|O|
|X|O|O|

Here, player O wins!
Because the player filled their symbol first in 3 consecutive cells linearly.

- Let the cells have indices starting at 0. The table will be as follows-

| | | |
|-|-|-|
|0|1|2|
|3|4|5|
|6|7|8|

- The winning patterns of indices will be-
```
[0,1,2]
[3,4,5]
[6,7,8]
[0,3,6]
[1,4,7]
[2,5,8]
[0,4,8]
[2,4,6]
```

*From Apna College's [Tic Tac Toe Game in JavaScript | JS Project | Lecture 9 of JavaScript Full Course](https://youtu.be/SqrppLEljkY?list=PLGjplNEQ1it_oTvuLRNqXfz_v_0pq6unW)*