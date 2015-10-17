# Example

A recreation of the example at https://github.com/sschmid/Entitas-CSharp-Example

created using entitas-ts cli st the starting point:

    git clone https://github.com/darkoverlordofdata/template example
    cd example
    
    entitas init example
    entitas create -c Acceleratable
    entitas create -c Accelerating
    entitas create -c Destroy
    entitas create -c Move speed:number maxSpeed:number
    entitas create -c Position x:number y:number z:number
    entitas create -c FinishLine
    entitas create -c Resource name:string
    entitas create -c View sprite:Object
    entitas create -e Accelerating
    entitas create -e FinishLine
    entitas create -s AccelerateSystem IReactiveSystem ISetPool
    entitas create -s DestroySystem  IReactiveSystem ISetPool
    entitas create -s InputSystem IExecuteSystem IInitializeSystem ISetPool
    entitas create -s MoveSystem IExecuteSystem ISetPool
    entitas create -s ReachedFinishSystem IReactiveSystem ISetPool
    entitas create -s RenderPositionSystem IReactiveSystem IEnsureComponents
    entitas create -s AddViewSystem IReactiveSystem
    entitas create -s RemoveViewSystem IMultiReactiveSystem IEnsureComponents ISetPool
    entitas create -s CreatePlayerSystem  IInitializeSystem ISetPool
    entitas create -s CreateOpponentsSystem  IInitializeSystem ISetPool
    entitas create -s CreateFinishLineSystem IInitializeSystem ISetPool
    entitas generate
    

# MIT License

Copyright (c) 2015 Bruce Davidson &lt;darkoverlordofdata@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

