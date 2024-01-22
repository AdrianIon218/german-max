import { useSelector } from "react-redux";
import { RootState } from "../../SliceReducers/store";

export function useIsLoadingOrNotifcationShown() {
  const isNotificationShown = useSelector(
    (store: RootState) => store.notification.isShown,
  );
  const isLoadingSignShown = useSelector(
    (store: RootState) => store.loading.isLoading,
  );
  return isNotificationShown || isLoadingSignShown;
}
