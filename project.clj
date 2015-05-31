(defproject ocr-evaluator "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :jvm-opts ["-Xmx6g"]
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [seesaw "1.4.5"]
                 [suub/error-codes "0.2.2-SNAPSHOT"]
                 [ring/ring-core "1.1.8"]
                 [ring/ring-jetty-adapter "1.1.8"]
                 ;[enfocus "2.0.0-SNAPSHOT"]
                 [domina "1.0.2"]
                 [org.clojure/data.xml "0.0.8"]
                 [org.clojure/tools.reader "0.8.8"]
                 [org.clojure/data.csv "0.1.2"]
                 [org.clojure/data.zip "0.1.1"]                 
                 [org.clojure/data.priority-map "0.0.5"]
                 [cljs-ajax "0.2.3"]
                 [org.clojure/clojurescript "0.0-2173"]
                 [org.clojure/core.async "0.1.267.0-0d7780-alpha"]
                 [om "0.5.0"]
                 [me.raynes/laser "1.1.1"]
                 [compojure "1.1.6"]
                 [suub/laser-experiments "0.1.0-SNAPSHOT"]]
  :resource-paths ["resources"]
  :main ocr-evaluator.core
  :aot [ocr-evaluator.core]
  :plugins [[lein-cljsbuild "1.0.2"]
            [lein-ring "0.8.3"]
            [cider/cider-nrepl "0.9.0-SNAPSHOT"]]
  :cljsbuild {:builds [{:source-paths ["src"],
                        :compiler {:output-to "resources/public/js/main.js"}}]}
  :ring {:handler ocr-evaluator.server/app})
