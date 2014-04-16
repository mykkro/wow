var Util = {
    /**
     * Finds whether line enters x>value halfplane
     * returns t value: [x'y'] = [x+t*dx, y+t*dy], t in <0,1>
     * return value: t or -1 if there is no intersection
     */
    findIntersectionWithXPlusHalfplane: function(x, y, dx, dy, value) {
        if (dx !== 0 && x < value && x + dx > value) {
            return (value - x) / dx;
        } else {
            // no intersection...
            return -1;
        }
    },
    findIntersectionWithXHalfplane: function(x, y, dx, dy, sign, value) {
        return (sign > 0) ? Util.findIntersectionWithXPlusHalfplane(x, y, dx, dy, value) : Util.findIntersectionWithXPlusHalfplane(-x, y, -dx, dy, value);
    },
    /**
     * Finds whether line enters specified halfplane (x>value, x<value, y>value, y<value)
     *
     * @param sign 1 or -1
     * @param direction if true, X halfplane; if false, Y halfplane
     */
    findIntersectionWithHalfplane: function(x, y, dx, dy, sign, direction, value) {
        return direction ? Util.findIntersectionWithXHalfplane(x, y, dx, dy, sign, value) : Util.findIntersectionWithXHalfplane(y, -x, dy, -dx, sign, direction ? -value : value);
    },
    normalizeVector: function(x, y) {
        var sz = Math.sqrt(x * x + y * y);
        return {
            x: x / sz,
            y: y / sz
        };
    }
};

module.exports = Util
