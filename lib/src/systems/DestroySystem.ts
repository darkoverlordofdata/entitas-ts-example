module example {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import CoreMatcher = entitas.CoreMatcher;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IReactiveSystem = entitas.IReactiveSystem;
  import ISetPool = entitas.ISetPool;

  export class DestroySystem implements IReactiveSystem, ISetPool {
    protected pool:Pool;

    public get trigger():TriggerOnEvent {
      return CoreMatcher.Destroy.onEntityAdded();
    }
    
    public execute(entities:Array<Entity>) {
      for (var i=0, l=entities.length; i<l; i++) {
        this.pool.destroyEntity(entities[i]);
      }
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }
  }
}