module example {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IExecuteSystem = entitas.IExecuteSystem;
  import IInitializeSystem = entitas.IInitializeSystem;
  import ISetPool = entitas.ISetPool;

  export class InputSystem implements IExecuteSystem, IInitializeSystem, ISetPool {
    protected pool:Pool;
    protected mouseDown:boolean=false;

    /**
     * Mouse Polling
     */
    public execute() {
      this.pool.isAccelerating = this.mouseDown;
    }
    
    public initialize() {
      document.addEventListener('touchstart', this.onTouchStart, true);
      document.addEventListener('touchend', this.onTouchEnd, true);

      document.addEventListener('mousedown', this.onTouchStart, true);
      document.addEventListener('mouseup', this.onTouchEnd, true);
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }

    private onTouchStart = (event) => {
      this.mouseDown = true;
      return true;
    };

    private onTouchEnd = (event) => {
      this.mouseDown = false;
    };
  }
}