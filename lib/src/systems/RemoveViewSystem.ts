module example {

  declare var viewContainer;

  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import IMatcher = entitas.IMatcher;
  import Exception = entitas.Exception;
  import IComponent = entitas.IComponent;
  import CoreMatcher = entitas.CoreMatcher;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  import IMultiReactiveSystem = entitas.IMultiReactiveSystem;
  import IEnsureComponents = entitas.IEnsureComponents;
  import ISetPool = entitas.ISetPool;

  export class RemoveViewSystem implements IMultiReactiveSystem, IEnsureComponents, ISetPool {
    protected pool:Pool;

    public get triggers():TriggerOnEvent[] {
      return [
        <TriggerOnEvent>CoreMatcher.Resource.onEntityRemoved(),
        <TriggerOnEvent>(<Matcher>Matcher.allOf(CoreMatcher.Resource, CoreMatcher.Destroy)).onEntityAdded()
      ];
    }
    
    public execute(entities:Array<Entity>) {
      for (var i = 0, l = entities.length; i < l; i++) {
        var e = entities[i];
        e.removeView();
      }
    }
    
    public get ensureComponents():IMatcher {
      return CoreMatcher.View;
    }
    
    public setPool(pool:Pool) {
      pool.getGroup(CoreMatcher.View).onEntityRemoved.add(this.onEntityRemoved);
    }

    protected onEntityRemoved(group:Group, entity:Entity, index:number, component:IComponent) {
      viewContainer.removeChild((<ViewComponent>component).sprite);

    }
  }
}