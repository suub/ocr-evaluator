(ns ocr-evaluator.server
  (:use [compojure.core]
        [compojure.handler]
        [ring.adapter.jetty :as jetty]
        [ring.middleware.file-info :only [wrap-file-info]]
        [ring.middleware.resource :only [wrap-resource]])
  (:require [clojure.java.io :as io]
            [clojure.java.io :refer :all]
            [compojure.route :as route]
            [me.raynes.laser :as l])
  (:gen-class))

(defn get-files-sorted [dir]
  (->> (file-seq (file dir))
       rest
       (sort-by #(.getName %))))

(defn read-file
  "List eine Datei ein entweder vom Verzeichnis oder vom jar
   Achtung! fügt automatisch ein / am Anfang ein wenn es im jar archiv sucht
   Ordner können im jar archiv nicht! gefunden werden"
  [path]
  (let [f (file path)]
    (if (.exists f)
      f
      (reader (.getResourceAsStream (class false)
                                    (.substring path
                                                (count "resources")
                                                (count path)))))))

(defn index-site []
  (l/document (l/parse (read-file "resources/public/indey.html"))))

(defroutes handler
  (GET "/index.html" [] (index-site))
  (GET "/page-list" [bd]
       (pr-str (map (memfn getName)
                    (get-files-sorted (file bd "edits")))))
  (GET "/get-site/:id" [id bd]
       (prn "id " id "bd " bd)
       (let [id (Integer/parseInt id)
             ocr (nth (get-files-sorted (file bd "ocr-results")) id)
             gt (nth (get-files-sorted (file bd "ground-truth")) id)
             error-codes (nth (get-files-sorted (file bd "edits")) id)]
         (pr-str {:left (slurp gt)
                  :right (slurp ocr)
                  :error-codes (read-string (slurp error-codes))})))
  (route/not-found (index-site)))


;handling routing "/" -> "/index.html"
(defn wrap-index [handler]
  (fn [req]
    (println (pr-str req))
    (if (= (:uri req) "/")  
      (handler (assoc req :uri "/index.html"))
      (handler req))))

;setting up a simple resource handler for ring
(def app (-> #'handler
             (wrap-resource "public")
             wrap-file-info
             wrap-index
             site))

(defn start-server [port]
  (jetty/run-jetty app {:port (Integer. port) :join? false}))


(defn -main [port]
  (jetty/run-jetty app {:port (Integer. port) :join? false}))



