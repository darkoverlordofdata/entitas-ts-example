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

  export class CreateOpponentsSystem implements IInitializeSystem, ISetPool {

    protected pool:Pool;

    public initialize() {
      const resourceName = "Opponent";
      for (var i = 1; i < 10; i++) {
        var speed = (Math.random()+.5) * 2;
        this.pool.createEntity()
          .addResource(resourceName)
          .addPosition(i*100 + 100, 0, 0)
          .addMove(speed, speed);
      }
    }
    
    public setPool(pool:Pool) {
      this.pool = pool;
    }
  }
}