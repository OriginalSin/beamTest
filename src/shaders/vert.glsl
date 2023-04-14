attribute vec2 prev; //предыдущая координата
attribute vec2 current; //текущая координата
attribute vec2 next; //следующая координата
attribute float order; //порядок
               
uniform float thickness; //толщина
uniform vec2 viewport; //размеры экрана

//Функция проецирование на экран
vec2 proj(vec2 coordinates){
    return coordinates / viewport;
}
               
void main() {
    vec2 _next = next;
    vec2 _prev = prev;

    //Блок проверок для случаев, когда координаты точек равны
    if( prev == current ) {
        if( next == current ){
            _next = current + vec2(1.0, 0.0);
            _prev = current - next;
        } else {
            _prev = current + normalize(current - next);
        }
    }
    if( next == current ) {
        _next = current + normalize(current - _prev);
    }
                   
    vec2 sNext = _next,
            sCurrent = current,
            sPrev = _prev;

    //Направляющие от текущей точки, до следующей и предыдущей координаты
    vec2 dirNext = normalize(sNext - sCurrent);
    vec2 dirPrev = normalize(sPrev - sCurrent);
    float dotNP = dot(dirNext, dirPrev);
    
    //Нормали относительно направляющих
    vec2 normalNext = normalize(vec2(-dirNext.y, dirNext.x));
    vec2 normalPrev = normalize(vec2(dirPrev.y, -dirPrev.x));
    float d = thickness * 0.5 * sign(order);
                   
    vec2 m; //m - точка сопряжения, от которой зависит будет угол обрезанным или нет
    if( dotNP >= 0.99991 ) {
        m = sCurrent - normalPrev * d;
    } else {
        vec2 dir = normalPrev + normalNext;
  
        // Таким образом ищется пересечение односторонних граней линии (рис. 2)
        m = sCurrent + dir * d / (dirNext.x * dir.y - dirNext.y * dir.x);
        
        //Проверка на пороговое значение остроты угла
        if( dotNP > 0.5 && dot(dirNext + dirPrev, m - sCurrent) < 0.0 ) {
            float occw = order * sign(dirNext.x * dirPrev.y - dirNext.y * dirPrev.x);
            //Блок решения для правильного построения цепочки LINE_STRING
            if( occw == -1.0 ) {
                m = sCurrent + normalPrev * d;
            } else if ( occw == 1.0 ) {
                m = sCurrent + normalNext * d;
            } else if ( occw == -2.0 ) {
                m = sCurrent + normalNext * d;
            } else if ( occw == 2.0 ) {
                m = sCurrent + normalPrev * d;
            }
         
        //Проверка "внутренней" точки пересечения, чтобы она не убегала за границы сопряженных сегментов
        } else if ( distance(sCurrent, m) > min(distance(sCurrent, sNext), distance(sCurrent, sPrev)) ) {
            m = sCurrent + normalNext * d;
        }
    }
    m = proj(m);
    gl_Position = vec4(m.x, m.y, 0.0, 1.0);
}