//
//  Math.h
//  SimonsFoundation POC
//
//  Created by Suri on 3/25/18.
//  Copyright © 2018 Suri. All rights reserved.
//

#ifndef Math_h
#define Math_h
#include <cmath>
#include <emscripten/bind.h>

class Math {
public:
    Math(){};
    float cSin(float x);
    float cCos(float y);
    void test();
};

EMSCRIPTEN_BINDINGS(my_module) {
    emscripten::class_<Math>("Math")
    .constructor<>()
    .function("sin", &Math::cSin)
    .function("cos", &Math::cCos);
}

#endif /* Math_h */
