/*
 * Raphaelicious 1.0 - Raphael Utility plugin
 *
 * Copyright (c) 2013 Myrousz <myrousz@gmail.com>
 * Dual-licensed under the GPL (http://www.opensource.org/licenses/gpl-3.0)
 * and the MIT (http://www.opensource.org/licenses/mit-license) licenses.
 */
(function() {

    /** 
     * Creates a grid set.
     *
     * @name rxGrid
     * @methodOf Raphael
     *
     * @author <a href="mailto:myrousz@gmail.com">Myrousz</a>
     * @version 1.0.
     * @param number xMin minimum x coordinate
     * @param number yMin minimum y coordinate
     * @param number xMax maximum x coordinate
     * @param number yMax maximum y coordinate
     * @param number xCell cell width
     * @param number yCell cell height
     * @returns object Raphael set containing grid
     *
     * @code paper.rxGrid(0, 0, 400, 400, 20, 20).attr("stroke", "#aaa");
     */
    Raphael.fn.rxGrid = function(xMin, yMin, xMax, yMax, xCell, yCell) {
        var st = this.set();
        for (var y = yMin; y <= yMax; y += yCell) {
            st.push(this.path("M" + xMin + " " + y + " L" + xMax + " " + y));
        }
        for (var x = xMin; x <= xMax; x += xCell) {
            st.push(this.path("M" + x + " " + yMin + "L" + x + " " + yMax));
        }
        return st;
    };

    /**
     * @name rxVector
     * @methodOf Raphael
     *
     * Creates a oriented line.
     *
     * @param number x x coordinate of start point
     * @param number y x coordinate of start point
     * @param number dx x component of direction vector
     * @param number dy y component of direction vector
     * @returns object Raphael set containing vector
     *
     * @code paper.rxVector(30, 40, 100, 150).attr("stroke", "#aaa");
     */
    Raphael.fn.rxVector = function(x, y, dx, dy) {
        var st = this.set();
        var def = "M" + x + " " + y + " L" + (x + dx) + " " + (y + dy);
        st.push(this.circle(x, y, 3).attr("fill", "#666"));
        st.push(this.path(def));
        return st;
    };

    /**
     * @name rxMakeDraggable
     * @methodOf Raphael
     *
     * Makes Raphael element draggable.
     *
     * @param object c Raphael object
     * @returns boolean true
     *
     * @code var circ = paper.circle(50, 50, 30);
     * @code var box = paper.rect(80, 60, 100, 40);
     * @code paper.rxMakeDraggable(circ);
     * @code paper.rxMakeDraggable(box);
     */
    Raphael.fn.rxMakeDraggable = function(c) {
        var drag = {
            x: 0,
            y: 0,
            state: false
        };
        c.attr('fill', '#80f');
        $(c.node).mousedown(function(e) {
            if (!drag.state) {
                c.attr({
                    fill: '#808'
                });
                // make dragged element the topmost one...
                c.toFront();
                drag.x = e.pageX;
                drag.y = e.pageY;
                drag.state = true;
            }
            return false;
        });

        $(c.node).mousemove(function(e) {
            if (drag.state) {
                c.translate(e.pageX - drag.x, e.pageY - drag.y);
                drag.x = e.pageX;
                drag.y = e.pageY;
            }
        });

        $(c.node).mouseup(function() {
            c.attr({
                fill: '#80f'
            });
            drag.state = false;
        });

        $(c.node).mouseout(function() {
            $(c.node).mouseup();
        });
    };


})();
