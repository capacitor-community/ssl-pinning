import React from "react";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import Heading from "@theme/Heading";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

interface Props {
  pluginId?: string;
  variables?: string;
  capacitorSlug?: string | null;
}

function NativeEnterpriseInstall(props: Props): JSX.Element {
  if (typeof props.pluginId === "undefined") {
    return null;
  }

  return (
    <>
      <Heading as="h2" id="installation">
        Installation
      </Heading>
      <p>
        If you have not already setup Ionic Enterprise in your app,{" "}
        <Link
          href="https://ionic.io/docs/premier-plugins/setup"
          target={null}
          rel={null}
        >
          follow the one-time setup steps
        </Link>
        .
      </p>
      <p>Next, install the plugin:</p>
      <Tabs
        defaultValue="cap"
        values={[
          { value: "cap", label: "Capacitor" },
          { value: "cdv", label: "Cordova" },
        ]}
      >
        <TabItem value="cap">
          {typeof props.capacitorSlug !== "undefined" &&
          props.capacitorSlug !== null ? (
            <div>
              Available as a{" "}
              <Link
                href={`https://capacitorjs.com/docs/apis/${props.capacitorSlug}`}
                target={null}
                rel={null}
              >
                core Capacitor plugin
              </Link>
              .
            </div>
          ) : (
            <CodeBlock className="language-bash">
              npm install @ionic-enterprise/{props.pluginId}
              {"\n"}
              npx cap sync
            </CodeBlock>
          )}
        </TabItem>
        <TabItem value="cdv">
          <CodeBlock className="language-bash">
            ionic cordova plugin add capacitor-compat-plugin
            {"\n"}
            ionic cordova plugin add @ionic-enterprise/{props.pluginId}{" "}
            {props.variables}
          </CodeBlock>
        </TabItem>
      </Tabs>
    </>
  );
}

export default NativeEnterpriseInstall;
