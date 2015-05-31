
(ns ocr-evaluator.core
  (:require [seesaw.core :refer :all]
            [seesaw.chooser :refer :all]
            [seesaw.cursor :refer :all])
  (:require [ocr-evaluator.server :as server]
            [ocr-evaluator.dict :as d]
            [clojure.java.io :as io]
            [error-codes.files :as ec])
  (:gen-class))

(alter-var-root #'*out* (constantly *out*))

(def server-atom (atom nil))

(defn create-frame []
  (let [gt-dir (text :text "" :columns 10 :id :gt-dir)
        ocr-dir (text :text "" :columns 10 :id :ocr-dir)
        target-dir (text :text "" :columns 10 :id :target-dir)
        input-dir (text :text "" :columns 10 :id :input-dir)
        output-dir (text :text "" :columns 10 :id :output-dir)
        param-dir (text :text "resources/current-params" :columns 10 :id :param-dir)
        port (text :text "" :columns 4 :id :port)]
    (frame
     :content
     (grid-panel
      :border "Properties"
      :columns 2
      :items ["Auszählung" ""
              "Ordner mit Ground-truth"
              (flow-panel
               :items
               [gt-dir
                (button :text "wählen"
                        :listen
                        [:action
                         (fn [& args]
                           (value! gt-dir
                                   (.getPath (choose-file))))])])
              "Ordner mit OCR"
              (flow-panel
               :items
               [ocr-dir
                (button :text "wählen"
                        :listen
                        [:action
                         (fn [& args]
                           (value! ocr-dir
                                   (.getPath (choose-file))))])])
              "Zielordner für Ergebnisse"
              (flow-panel
               :items
               [target-dir
                (button :text "wählen"
                        :listen
                        [:action
                         (fn [& args]
                           (prn "hi")
                           (value! target-dir
                                   (.getPath (choose-file))))])])
              ""
              (button :text "Auszählung starten"
                      :listen
                      [:action
                       (fn [e]
                         (let [tdir (io/file (value target-dir))]
                           (.mkdirs (io/file tdir "edits"))
                           (prn "copy to target folder")
                           (.mkdirs (io/file tdir "ground-truth"))
                           (doseq [f (rest (file-seq (io/file (value gt-dir))))]
                             (io/copy (io/file (value gt-dir) (.getName f))
                                      (io/file tdir "ground-truth" (.getName f))))
                           (.mkdirs (io/file tdir "ocr-results"))
                           (doseq [f (rest (file-seq (io/file (value ocr-dir))))]
                             (io/copy (io/file (value ocr-dir) (.getName f))
                                      (io/file tdir "ocr-results" (.getName f))))
                           (prn "deploy error-codes")
                           (ec/deploy-error-codes tdir)
                           (prn "generate-statistics")
                           (spit (io/file tdir "statistics.edn")
                                 (ec/gen-statistics-for-base-directories [tdir]))
                           (spit (io/file tdir "word-statistics.edn")
                                 (ec/gen-word-statistics-for-base-directories [tdir])))
                         (prn "done"))])
              "Nachkorrektur" ""
              "Parameterordner"
              (flow-panel
               :items
               [param-dir
                (button :text "wählen"
                        :listen
                        [:action
                         (fn [& args]
                           (value! param-dir
                                   (.getPath (choose-file))))])])
              "Eingabeordner"
              (flow-panel
               :items
               [input-dir
                (button :text "wählen"
                        :listen
                        [:action
                         (fn [& args]
                           (value! input-dir
                                   (.getPath (choose-file))))])])
              "Ausgabeordner"
              (flow-panel
               :items
               [output-dir
                (button :text "wählen"
                        :listen
                        [:action
                         (fn [& args]
                           (value! output-dir
                                   (.getPath (choose-file))))])])
              ""
              (button :text "Nachkorrektur starten"
                      :listen
                      [:action
                       (fn [e]
                         (prn "get-params")
                         (let [params (d/get-current-params (io/file (value param-dir)))]
                           (prn "evaluate")
                           (d/analyzed-to-postcorrected params
                                                        (io/file (value input-dir))
                                                        (io/file (value output-dir))))
                         (prn "done"))])
              "Visualisierung"
              (flow-panel
               :hgap 20
               :items ["port"
                       port
                       (button :text "Server starten"
                               :listen
                               [:action
                                (fn [& args]
                                  (reset! server-atom (server/start-server
                                                       (Integer/parseInt (value port)))))])]
               )]))))

(defn -main []
  (-> (create-frame) pack! show!))



