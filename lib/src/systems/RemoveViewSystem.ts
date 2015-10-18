module example {

  declare var viewContainer;

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import IMatcher = entitas.IMatcher;
  import Exception = entitas.Exception;
  import IComponent = entitas.IComponent;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IMultiReactiveSystem = entitas.IMultiReactiveSystem;
  import IEnsureComponents = entitas.IEnsureComponents;
  import ISetPool = entitas.ISetPool;

  export class RemoveViewSystem implements IMultiReactiveSystem, IEnsureComponents, ISetPool {
    protected pool:Pool;

    public get triggers():TriggerOnEvent[] {
      return [
        <TriggerOnEvent>Matcher.Resource.onEntityRemoved(),
        <TriggerOnEvent>(<Matcher>Matcher.allOf(Matcher.Resource, Matcher.Destroy)).onEntityAdded()
      ];
    }

    /**
     * Execute when both Resource and Destroy are present
     * @param entities
     */
    public execute(entities:Array<Entity>) {
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];
        e.removeView();
      }
    }
    
    public get ensureComponents():IMatcher {
      return Matcher.View;
    }
    
    public setPool(pool:Pool) {
      pool.getGroup(Matcher.View).onEntityRemoved.add(this.onEntityRemoved);
    }

    protected onEntityRemoved(group:Group, entity:Entity, index:number, component:IComponent) {
      viewContainer.removeChild((<ViewComponent>component).sprite);
    }
  }
}