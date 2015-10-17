module example {

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import CoreMatcher = entitas.CoreMatcher;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IInitializeSystem = entitas.IInitializeSystem;
  import ISetPool = entitas.ISetPool;

  export class CreateFinishLineSystem implements IInitializeSystem, ISetPool {

    protected pool:Pool;

    public initialize() {
      this.pool.createEntity()
        .setFinishLine(true)
        .addResource("Finish Line")
        .addPosition(9, 7, 0);
    }

    public setPool(pool:Pool) {
      this.pool = pool;
    }
    


  }
}