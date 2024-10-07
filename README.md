ThreeElement.tsx 에는 scene안에 들어가는 오브젝트들을 작성하는 페이지이다.
Landing.tsx는 scene,render,camera를 작성하는 곳이다.



-------------------------------------------------------------------------------------

1.Camera
 - Perspective Camera (원근카메라,투시카메라)
 - Orthographic Camera (직각)


 2.Scene
 Three.js안에서는 모든 오브젝트들은 Mesh이다.그리고 mesh 는 geometry와 material로 이루어져있다.
 -Geometry란 각 오브젝트들의 셰이프이고
 -Material은 색상이나 질감등 geometry의 겉감이다.

------------------------------------------------------------------------------------

3.Orbit Controls

4.Axes Helper

5.Grid Helper

6.Leva
- GUI controler

------------------------------------------------------------------------------------

7.Mesh를 프로퍼티를 작성해서 디폴트 값을 정해주고 useFrame 훅을 사용해서 애니메이션으로 만들고 값을 변경한다.

8.Mesh는 셰잎을 결정하는 Geometry와 색상이나 질감등을 표현하는 Material로 이뤄져있다.

------------------------------------------------------------------------------------

9.World,Local 좌표계 
-Scene은 world좌표계이고 
-group 이나 mesh는 local 좌표계로 보면된다.