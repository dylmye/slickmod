package com.slickmod;

import com.facebook.react.ReactActivity;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "slickmod";
  }

  /**
   * This override is recommended by react-native-screens to specifically discards any Activity
   * state persisted during the Activity restart process, to avoid inconsistencies that lead to crashes
   * @see https://github.com/software-mansion/react-native-screens#android
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(null);
  }
}
