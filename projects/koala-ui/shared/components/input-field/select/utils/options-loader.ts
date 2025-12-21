import { effect } from '@angular/core';
import { Select } from '../select';

export function loadOptions(component: Select) {
  effect(() => {
    const options = component.optionsResource();

    if (!options) {
      return;
    }

    const { onDemand, onServer, inMemory, inMemoryWithLoading } = options;

    if (onDemand) {
      component.optionList.set(onDemand.value());
      component.isLoading.set(onDemand.isLoading());
    } else if (onServer) {
      component.optionList.set(component.applyFilter(onServer.value()));
      component.isLoading.set(onServer.isLoading());
    } else if (inMemory) {
      component.optionList.set(component.applyFilter(inMemory));
      component.isLoading.set(false);
    } else if (inMemoryWithLoading) {
      const optionsWithLoading = inMemoryWithLoading();
      component.optionList.set(component.applyFilter(optionsWithLoading ?? []));
      component.isLoading.set(!optionsWithLoading);
    }
  });
}
