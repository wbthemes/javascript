(() => {
  (function () {
    document.body.classList.add("no-transition");
    if (localStorage.getItem("sidebarState") === "collapsed") {
      document.body.classList.add("sidebar-collapsed");
    }
  })();
  window.removeFromHistory = function (p7) {
    if (!p7) {
      return;
    }
    let v18 = JSON.parse(localStorage.getItem("watchHistoryIDs") || "[]");
    v18 = v18.filter(p8 => String(p8) !== String(p7));
    localStorage.setItem("watchHistoryIDs", JSON.stringify(v18));
    let v19 = document.getElementById("history-item-" + p7);
    if (v19) {
      v19.remove();
    }
    let v20 = document.getElementById("history-items-list");
    if (v20 && v20.children.length === 0) {
      document.getElementById("history-empty-message").style.display = "block";
    }
    if (typeof window.updateHistoryBadge == "function") {
      window.updateHistoryBadge();
    }
  };
  function f() {
    if ($("body").find(".item-post").length) {
      var v$ = $("#post-page-sidebar .widget");
      if (v$.length) {
        v$.appendTo("#post-page-sidebar-content");
      }
    }
  }
  document.addEventListener("DOMContentLoaded", function () {
    let v21 = document.getElementById("comments");
    if (v21) {
      v21.addEventListener("click", function (p9) {
        let v22 = p9.target.closest(".qa-footer");
        if (v22) {
          p9.preventDefault();
          let v23 = v22.closest(".qa-card");
          if (v23) {
            let v24 = document.querySelector(".comment[data-qa-id=\"" + v23.dataset.qaId + "\"]");
            if (v24) {
              let v25 = v24.querySelector(".comment-actions a.comment-reply");
              if (v25) {
                v25.click();
              }
            }
          }
        }
      });
    }
    let v26 = document.body;
    let v27 = document.getElementById("sidebarToggle");
    setTimeout(() => {
      v26.classList.remove("no-transition");
    }, 100);
    if (v27) {
      v27.addEventListener("click", () => {
        v26.classList.toggle("sidebar-collapsed");
        localStorage.setItem("sidebarState", v26.classList.contains("sidebar-collapsed") ? "collapsed" : "expanded");
        setTimeout(function () {
          $("#dynamic-main-slider, #PopularPosts1 .owl-carousel").trigger("refresh.owl.carousel");
        }, 350);
      });
    }
    let v28 = window.location.pathname;
    let v29 = document.querySelectorAll(".sidebar-nav a");
    let v30 = null;
    let v31 = -1;
    v29.forEach(p10 => {
      let v32 = p10.getAttribute("href");
      if (!v32 || !v32.startsWith("#")) {
        try {
          let v33 = new URL(p10.href).pathname;
          if (v33 === "/" && v28 === "/") {
            v30 = p10;
            v31 = 1;
          } else if (v33 !== "/" && v28.startsWith(v33) && v33.length > v31) {
            v31 = v33.length;
            v30 = p10;
          }
        } catch {}
      }
    });
    if (v30) {
      v29.forEach(p11 => p11.parentElement.classList.remove("active"));
      v30.parentElement.classList.add("active");
    }
    let v34 = document.querySelector("a[href=\"#clear-cache\"]");
    if (v34) {
      v34.addEventListener("click", function (p12) {
        p12.preventDefault();
        if (confirm("This will clear cached data. Continue?")) {
          localStorage.clear();
          sessionStorage.clear();
          alert("Cache cleared. The page will now reload.");
          window.location.reload(true);
        }
      });
    }
    if (document.body.classList.contains("final-layout-script-loaded")) {
      return;
    }
    document.body.classList.add("final-layout-script-loaded");
    let v35 = document.querySelector(".post-page-final-container");
    if (v35) {
      try {
        let vF5 = function (p13) {
          if (!p13) {
            return;
          }
          let v36 = JSON.parse(localStorage.getItem("watchHistoryIDs") || "[]");
          v36 = v36.filter(p14 => String(p14) !== String(p13));
          v36.unshift(p13);
          if (v36.length > 50) {
            v36.pop();
          }
          localStorage.setItem("watchHistoryIDs", JSON.stringify(v36));
        };
        let vF6 = function (p15) {
          v105 = p15;
          let v37 = vO2[v105]?.length || 0;
          let vLN50 = 50;
          let v38 = Math.ceil(v37 / vLN50);
          let v39 = v35.querySelector(".episodes-pagination-final");
          let v40 = v35.querySelector(".episodes-grid-container-final");
          let v41 = v35.querySelector("#episodes-content").querySelector(".total-ep-header");
          if (v41) {
            v41.remove();
          }
          if (v37 > 0) {
            let v42 = "\n                    <div class=\"total-ep-header\">\n                        <p class=\"total-ep-count\">Total Episodes: " + v37 + "</p>\n                        <button class=\"all-episodes-btn-mobile\">\n                            All Episodes\n                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\">\n                              <path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/>\n                            </svg>\n                        </button>\n                    </div>\n                ";
            v39.insertAdjacentHTML("beforebegin", v42);
          }
          v39.innerHTML = "";
          v40.innerHTML = "";
          if (v37 === 0) {
            return;
          }
          let v43 = v37 > 50 ? "<div class=\"ep-range-tabs-container\"></div>" : "";
          let vLSdivClasseprangedropd = "\n                <div class=\"ep-range-dropdown\">\n                    <button class=\"ep-range-dropdown-toggle\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\"><path fill-rule=\"evenodd\" d=\"M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z\" clip-rule=\"evenodd\" /></svg></button>\n                    <div class=\"ep-range-dropdown-menu\"></div>\n                </div>";
          v39.innerHTML = v43 + vLSdivClasseprangedropd;
          for (let vLN02 = 0; vLN02 < v38; vLN02++) {
            let v44 = document.createElement("div");
            v44.className = "episodes-grid-final";
            v44.dataset.page = vLN02 + 1;
            v40.appendChild(v44);
            for (let vLN03 = 0; vLN03 < vLN50; vLN03++) {
              let v45 = vLN02 * vLN50 + vLN03 + 1;
              if (v45 > v37) {
                break;
              }
              let v46 = document.createElement("a");
              v46.className = "ep-button";
              v46.dataset.epIndex = v45 - 1;
              v46.innerHTML = "<span class=\"ep-number-text\">" + v45 + "</span><span class=\"ep-active-indicator\"><svg viewBox=\"0 0 24 24\"><rect class=\"bar bar1\" x=\"4\" y=\"8\" width=\"4\" height=\"10\" rx=\"1\"></rect><rect class=\"bar bar2\" x=\"10\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\"></rect><rect class=\"bar bar3\" x=\"16\" y=\"10\" width=\"4\" height=\"8\" rx=\"1\"></rect></svg></span>";
              v44.appendChild(v46);
            }
          }
          if (vLN05 >= v37) {
            vLN05 = 0;
          }
          let v47 = document.getElementById("all-episodes-modal-overlay");
          let v48 = document.getElementById("all-episodes-modal-grid");
          let v49 = v47.querySelector(".episodes-modal-close-btn");
          let vF7 = () => {
            v48.innerHTML = "";
            v35.querySelectorAll(".episodes-grid-final .ep-button").forEach(p16 => {
              let v50 = p16.cloneNode(!0);
              v48.appendChild(v50);
            });
            v47.classList.add("is-visible");
            document.body.style.overflow = "hidden";
          };
          let vF8 = () => {
            v47.classList.remove("is-visible");
            document.body.style.overflow = "";
          };
          let v51 = v35.querySelector(".all-episodes-btn-mobile");
          if (v51) {
            v51.onclick = vF7;
          }
          v49.onclick = vF8;
          v47.onclick = p17 => {
            if (p17.target === v47) {
              vF8();
            }
          };
          v48.onclick = p18 => {
            let v52 = p18.target.closest(".ep-button");
            if (v52) {
              p18.preventDefault();
              let vParseInt = parseInt(v52.dataset.epIndex, 10);
              vF11(vParseInt);
              vF8();
            }
          };
          vF11(vLN05);
        };
        let vF9 = function () {
          v109.innerHTML = "";
          vA2.forEach(p19 => {
            let v53 = document.createElement("button");
            v53.className = "server-btn";
            v53.dataset.server = p19;
            let v54 = v81.querySelector("ul[data-server-name=\"" + p19 + "\"]");
            let v55 = v54 ? v54.dataset.serverLogo : null;
            let vLS = "";
            if (v55) {
              vLS = "<img src=\"" + v55 + "\" alt=\"" + p19 + "\" class=\"server-logo-img\"/> <span class=\"server-name-text\">" + p19 + "</span>";
            } else {
              vLS = "<span class=\"server-name-text\">" + p19 + "</span>";
            }
            v53.innerHTML = vLS;
            if (p19 === v105) {
              v53.classList.add("active");
            }
            v109.appendChild(v53);
          });
        };
        let vF10 = function () {
          v110.innerHTML = "";
          let v56 = v96.length;
          if (v56 === 0) {
            return;
          }
          v110.innerHTML = "<p class=\"total-ep-count\">Total Files: " + v56 + "</p>";
          let v57 = document.createElement("div");
          v57.className = "download-grid-final";
          v96.forEach(p20 => {
            let v58 = document.createElement("a");
            v58.href = p20.href;
            v58.className = "ep-button";
            v58.setAttribute("target", "_blank");
            v58.textContent = p20.textContent;
            v57.appendChild(v58);
          });
          v110.appendChild(v57);
        };
        let vF11 = function (p21) {
          let v59 = vO2[v105]?.length || 0;
          if (p21 < 0 || p21 >= v59) {
            return;
          }
          vLN05 = p21;
          const vO = {
            server: v105,
            episode: vLN05
          };
          let vVO = vO;
          localStorage.setItem(v104, JSON.stringify(vVO));
          let v60 = document.getElementById("post-id");
          if (v60) {
            let v61 = v60.getAttribute("data-post-id");
            if (v61) {
              try {
                let v62 = JSON.parse(localStorage.getItem("abefilmWatchProgress") || "{}");
                v62["post-" + v61] = p21;
                localStorage.setItem("abefilmWatchProgress", JSON.stringify(v62));
              } catch (e3) {
                console.error("Could not save watch progress", e3);
              }
            }
          }
          v97.src = vO2[v105][p21].href;
          v116.textContent = p21 + 1 + " / " + v59;
          document.querySelectorAll(".episodes-grid-container-final, #all-episodes-modal-grid").forEach(p22 => {
            let v63 = p22.querySelector(".ep-button.active");
            if (v63) {
              v63.classList.remove("active");
            }
            let v64 = p22.querySelector(".ep-button[data-ep-index=\"" + p21 + "\"]");
            if (v64) {
              v64.classList.add("active");
              if (p22.classList.contains("episodes-grid-container-final")) {
                v64.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                  inline: "center"
                });
              }
            }
          });
          v114.disabled = p21 === 0;
          v115.disabled = p21 === v59 - 1;
          let v65 = Math.floor(p21 / 50) + 1;
          let v66 = v35.querySelector(".episodes-pagination-final");
          if (v66 && v66.innerHTML) {
            let v67 = v66.querySelector(".ep-range-tabs-container .ep-range-tab.active");
            if (!v67 || parseInt(v67.dataset.page, 10) !== v65) {
              vF12(v65);
              vF13(v65);
            }
          }
        };
        let vF12 = function (p23) {
          let v68 = vO2[v105]?.length || 0;
          let vLN502 = 50;
          let v69 = Math.ceil(v68 / vLN502);
          let vLN3 = 3;
          let v70 = v35.querySelector(".episodes-pagination-final");
          let v71 = v70.querySelector(".ep-range-tabs-container");
          let v72 = v70.querySelector(".ep-range-dropdown-menu");
          if (v71) {
            v71.innerHTML = "";
          }
          v72.innerHTML = "";
          let vLN1 = 1;
          if (v69 > vLN3 && p23 > vLN3) {
            vLN1 = Math.floor((p23 - 1) / vLN3) * vLN3 + 1;
          }
          for (let vLN04 = 0; vLN04 < v69; vLN04++) {
            let v73 = vLN04 + 1;
            let v74 = vLN04 * vLN502 + 1;
            let v75 = Math.min((vLN04 + 1) * vLN502, v68);
            let v76 = v74 + "-" + v75;
            let v77 = document.createElement("a");
            v77.className = "ep-range-tab";
            v77.href = "#";
            v77.dataset.page = v73;
            v77.innerHTML = "<span>" + v76 + "</span>";
            if (v73 === p23) {
              v77.classList.add("active");
            }
            v72.appendChild(v77);
            if (v71 && v73 >= vLN1 && v73 < vLN1 + vLN3) {
              let v78 = document.createElement("button");
              v78.className = "ep-range-tab";
              v78.dataset.page = v73;
              v78.innerHTML = "<span>" + v76 + "</span>";
              if (v73 === p23) {
                v78.classList.add("active");
              }
              v71.appendChild(v78);
            }
          }
          let v79 = v70.querySelector(".ep-range-dropdown-toggle");
          if (v79) {
            v79.style.display = v69 > 1 ? "flex" : "none";
          }
        };
        let vF13 = function (p24) {
          v35.querySelectorAll(".episodes-grid-final").forEach(p25 => {
            p25.classList.toggle("active", p25.dataset.page == p24);
          });
        };
        var vVF5 = vF5;
        var vVF6 = vF6;
        var vVF9 = vF9;
        var vVF10 = vF10;
        var vVF11 = vF11;
        var vVF12 = vF12;
        var vVF13 = vF13;
        let v80 = document.querySelector("#source-data-container");
        if (!v80) {
          throw new Error("Source data container (#source-data-container) not found.");
        }
        let v81 = v80.querySelector(".post-body");
        if (!v81) {
          throw new Error("Source data element (.post-body) not found inside hidden container.");
        }
        let vF14 = () => v80.querySelector(".entry-title")?.textContent.trim() || "";
        let vF15 = () => v81.querySelector("#overview-data")?.textContent.trim() || "";
        let vF16 = (p26, p27) => v81.querySelector(p26)?.getAttribute(p27) || "";
        let vF17 = p28 => v81.querySelector(p28)?.textContent.trim() || "";
        let vVF16 = vF16("img[alt=\"poster\"]", "src");
        let vVF17 = vF17("span.slider-backdrop");
        let vVF172 = vF17("#extra-meta .meta-rating");
        let vVF173 = vF17("#extra-meta .meta-year");
        let vVF174 = vF17("#extra-meta .meta-pg");
        let vVF175 = vF17("#extra-meta .meta-status");
        let vVF176 = vF17("#extra-meta .meta-country");
        let v82 = Array.from(v81.querySelectorAll("#extra-meta .meta-genre")).map(p29 => p29.textContent.trim());
        let v83 = v35.querySelector("#add-to-watchlist-btn");
        if (v83) {
          let v84 = new URL(window.location.href).pathname;
          let vVF14 = vF14();
          let v85 = window.location.href;
          let v86 = vVF17 || vVF16;
          v83.setAttribute("data-post-id", v84);
          v83.setAttribute("data-post-title", vVF14);
          v83.setAttribute("data-post-url", v85);
          v83.setAttribute("data-post-image", v86);
          $(document).trigger("abefilm:postDataReady", [{
            id: v84,
            title: vVF14,
            url: v85,
            image: v86
          }]);
        }
        v35.querySelectorAll(".details-header-final").forEach(p30 => {
          p30.querySelector(".poster-final img").src = vVF16;
          p30.querySelector(".title-final").textContent = vF14();
          let v87 = p30.querySelector(".meta-line-final");
          if (vVF172) {
            v87.innerHTML += "<span class=\"rating\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\">\n    <path d=\"M15.0183 9.43335L15.5462 10.498C15.6182 10.6462 15.8102 10.7883 15.9722 10.8155L16.9291 10.9758C17.541 11.0787 17.685 11.5263 17.244 11.9678L16.5001 12.7179C16.3741 12.8449 16.3051 13.0899 16.3441 13.2653L16.5571 14.1938C16.7251 14.9288 16.3381 15.2131 15.6932 14.829L14.7963 14.2937C14.6343 14.1969 14.3674 14.1969 14.2024 14.2937L13.3055 14.829C12.6636 15.2131 12.2736 14.9258 12.4416 14.1938L12.6546 13.2653C12.6935 13.0899 12.6246 12.8449 12.4986 12.7179L11.7547 11.9678C11.3167 11.5263 11.4577 11.0787 12.0696 10.9758L13.0265 10.8155C13.1855 10.7883 13.3775 10.6462 13.4495 10.498L13.9774 9.43335C14.2654 8.85568 14.7333 8.85568 15.0183 9.43335Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M8 17L8 20.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M8 3.5V7\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M22 8.87895C21.9331 7.33687 21.7456 6.33298 21.2203 5.53884C20.9181 5.08196 20.5428 4.68459 20.1112 4.36468C18.9447 3.5 17.299 3.5 14.0078 3.5H9.99305C6.70178 3.5 5.05614 3.5 3.88962 4.36468C3.45805 4.68459 3.08267 5.08196 2.78047 5.53884C2.25526 6.33289 2.06776 7.33665 2.00083 8.87843C1.98938 9.14208 2.21648 9.34375 2.46531 9.34375C3.85109 9.34375 4.97449 10.533 4.97449 12C4.97449 13.467 3.85109 14.6562 2.46531 14.6562C2.21648 14.6562 1.98938 14.8579 2.00083 15.1216C2.06776 16.6634 2.25526 17.6671 2.78047 18.4612C3.08267 18.918 3.45805 19.3154 3.88962 19.6353C5.05614 20.5 6.70178 20.5 9.99306 20.5H14.0078C17.299 20.5 18.9447 20.5 20.1112 19.6353C20.5428 19.3154 20.9181 18.918 21.2203 18.4612C21.7456 17.667 21.9331 16.6631 22 15.1211V8.87895Z\" stroke=\"grey\" stroke-width=\"1.5\" stroke-linejoin=\"round\" />\n</svg> " + vVF172 + "</span>";
          }
          if (vVF173) {
            v87.innerHTML += "<span>" + vVF173 + "</span>";
          }
          if (vVF176) {
            v87.innerHTML += "<span>" + vVF176 + "</span>";
          }
          if (vVF174) {
            v87.innerHTML += "<span>" + vVF174 + "</span>";
          }
          let v88 = p30.querySelector(".tags-line-final");
          v82.forEach(p31 => v88.innerHTML += "<span class=\"tag\">" + p31 + "</span>");
          if (vVF175) {
            let v89 = p30.querySelector(".meta-line-final");
            if (v89) {
              v89.insertAdjacentHTML("afterend", "<div style=\"font-size:13px; color:#a7a7a7; margin-top:8px;\">" + vVF175 + "</div>");
            }
          }
        });
        v35.querySelector(".synopsis-final").textContent = vF15();
        let v90 = v81.querySelectorAll("#celebrity-data li");
        if (v90.length > 0) {
          let v91 = v35.querySelector("#celebrity-section");
          let v92 = v35.querySelector(".celebrity-grid-final");
          v91.style.display = "block";
          v90.forEach(p32 => {
            let v93 = p32.querySelector("img")?.src || "";
            let v94 = p32.querySelector("span")?.textContent || "";
            v92.innerHTML += "<div class=\"celebrity-item-final\"><img src=\"" + v93 + "\" alt=\"" + v94 + "\"/><span class=\"name\">" + v94 + "</span></div>";
          });
        }
        let vO2 = {};
        let vA2 = [];
        v81.querySelectorAll("#episodes-data > ul[data-server-name]").forEach(p33 => {
          let v95 = p33.dataset.serverName;
          if (v95 && p33.querySelectorAll("a").length > 0) {
            vA2.push(v95);
            vO2[v95] = Array.from(p33.querySelectorAll("a"));
          }
        });
        let v96 = Array.from(v81.querySelectorAll("#download-data a"));
        let v97 = v35.querySelector(".video-player-container-final iframe");
        let v98 = v35.querySelector(".video-player-container-final");
        let v99 = v35.querySelector(".video-overlay");
        if (v99 && vVF17) {
          v99.style.backgroundImage = "url(" + vVF17 + ")";
        }
        if (v99) {
          v99.addEventListener("click", () => {
            let v100 = document.getElementById("post-id");
            if (v100) {
              let v101 = v100.getAttribute("data-post-id");
              if (v101) {
                vF5(v101);
              }
            }
            v98.classList.add("is-playing");
            let v102 = v97.getAttribute("src");
            if (v102 && v102 !== "about:blank") {
              try {
                let v103 = new URL(v102);
                v103.searchParams.set("autoplay", "1");
                v97.setAttribute("src", v103.href);
              } catch {
                v97.setAttribute("src", v102 + (v102.includes("?") ? "&" : "?") + "autoplay=1");
              }
            }
          });
        }
        let v104 = "watchState_" + window.location.pathname;
        let vLN05 = 0;
        let v105 = vA2[0] || null;
        let v106 = localStorage.getItem(v104);
        if (v106) {
          try {
            let v107 = JSON.parse(v106);
            if (v107 && vA2.includes(v107.server)) {
              let v108 = vO2[v107.server]?.length || 0;
              if (v107.episode < v108) {
                v105 = v107.server;
                vLN05 = v107.episode;
              }
            }
          } catch (e4) {
            console.error("Could not parse saved watch state.", e4);
          }
        }
        let v109 = v35.querySelector(".server-selection-final");
        let v110 = v35.querySelector(".download-links-container");
        let v111 = v35.querySelector("#reload-btn");
        let v112 = v35.querySelector("#fullscreen-btn");
        let v113 = v35.querySelector("#sandbox-checkbox");
        let v114 = v35.querySelector("#prev-ep-btn");
        let v115 = v35.querySelector("#next-ep-btn");
        let v116 = v35.querySelector("#ep-counter");
        let v117 = v35.querySelector("#season-info");
        let v118 = vA2.length > 0 && vO2[vA2[0]]?.length > 0;
        let v119 = vA2.length > 1;
        let v120 = v96.length > 0;
        if (v118 || v119 || v120) {
          let v121 = v35.querySelector("#episodes-section");
          v121.style.display = "block";
          let v122 = v35.querySelector(".episodes-tabs-final");
          let v123 = v35.querySelectorAll(".ep-tab-content");
          let v124 = null;
          v122.innerHTML = "";
          if (v118) {
            v122.innerHTML += "<button class=\"ep-tab-button\" data-target=\"#episodes-content\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\">\n    <path d=\"M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6H14C17.7712 6 19.6569 6 20.8284 7.17157C22 8.34315 22 10.2288 22 14C22 17.7712 22 19.6569 20.8284 20.8284C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14Z\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path>\n    <path d=\"M9 3L12 6L16 2\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>Episodes</button>";
            v124 ||= "#episodes-content";
          }
          if (v119) {
            v122.innerHTML += "<button class=\"ep-tab-button\" data-target=\"#server-content\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"none\">\n    <path d=\"M19 4H5C4.06812 4 3.60218 4 3.23463 4.15224C2.74458 4.35523 2.35523 4.74458 2.15224 5.23463C2 5.60218 2 6.06812 2 7C2 7.93188 2 8.39782 2.15224 8.76537C2.35523 9.25542 2.74458 9.64477 3.23463 9.84776C3.60218 10 4.06812 10 5 10H19C19.9319 10 20.3978 10 20.7654 9.84776C21.2554 9.64477 21.6448 9.25542 21.8478 8.76537C22 8.39782 22 7.93188 22 7C22 6.06812 22 5.60218 21.8478 5.23463C21.6448 4.74458 21.2554 4.35523 20.7654 4.15224C20.3978 4 19.9319 4 19 4Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n    <path d=\"M19 14H5C4.06812 14 3.60218 14 3.23463 14.1522C2.74458 14.3552 2.35523 14.7446 2.15224 15.2346C2 15.6022 2 16.0681 2 17C2 17.9319 2 18.3978 2.15224 18.7654C2.35523 19.2554 2.74458 19.6448 3.23463 19.8478C3.60218 20 4.06812 20 5 20H19C19.9319 20 20.3978 20 20.7654 19.8478C21.2554 19.6448 21.6448 19.2554 21.8478 18.7654C22 18.3978 22 17.9319 22 17C22 16.0681 22 15.6022 21.8478 15.2346C21.6448 14.7446 21.2554 14.3552 20.7654 14.1522C20.3978 14 19.9319 14 19 14Z\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n    <path d=\"M6 17H6.01\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n    <path d=\"M10 17H10.01\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n    <path d=\"M6 7H6.01\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n    <path d=\"M10 7H10.01\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>Server<span class=\"tab-count\">" + vA2.length + "</span></button>";
            v124 ||= "#server-content";
          }
          if (v120) {
            v122.innerHTML += "<button class=\"ep-tab-button\" data-target=\"#download-content\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\">\n    <path d=\"M2.99969 17.0002C2.99969 17.9302 2.99969 18.3952 3.10192 18.7767C3.37932 19.8119 4.18796 20.6206 5.22324 20.898C5.60474 21.0002 6.06972 21.0002 6.99969 21.0002L16.9997 21.0002C17.9297 21.0002 18.3947 21.0002 18.7762 20.898C19.8114 20.6206 20.6201 19.8119 20.8975 18.7767C20.9997 18.3952 20.9997 17.9302 20.9997 17.0002\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n    <path d=\"M16.4998 11.5002C16.4998 11.5002 13.1856 16.0002 11.9997 16.0002C10.8139 16.0002 7.49976 11.5002 7.49976 11.5002M11.9997 15.0002V3.00016\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>Download</button>";
            v124 ||= "#download-content";
          }
          if (v124) {
            v122.querySelector("[data-target=\"" + v124 + "\"]").classList.add("active");
            v35.querySelector(v124).classList.add("active");
          }
          if (v118) {
            vF6(v105);
          } else {
            v35.querySelector(".footer-group-middle").style.display = "none";
          }
          if (v119) {
            vF9();
          }
          if (v120) {
            vF10();
          }
          v122.addEventListener("click", p34 => {
            let v125 = p34.target.closest(".ep-tab-button");
            if (v125) {
              v122.querySelector(".active")?.classList.remove("active");
              v125.classList.add("active");
              v123.forEach(p35 => p35.classList.remove("active"));
              let v126 = v125.dataset.target;
              v35.querySelector(v126).classList.add("active");
            }
          });
          v109.addEventListener("click", p36 => {
            if (p36.target.matches(".server-btn")) {
              let v127 = p36.target.dataset.server;
              if (v127 !== v105) {
                vF6(v127);
                vF9();
              }
            }
          });
          if (v118) {
            let vF18 = function () {
              let v128 = document.querySelector(".ep-range-dropdown-menu.is-open-globally");
              if (v128) {
                v128.classList.remove("is-open-globally");
              }
              window.removeEventListener("scroll", vF19);
              v131 = !1;
            };
            let vF19 = function () {
              vF18();
            };
            let vF20 = function (p37, p38) {
              let v129 = p37.getBoundingClientRect().bottom + 8;
              const vO3 = {
                once: !0
              };
              p38.style.top = v129 + "px";
              p38.classList.add("is-open-globally");
              if (!v131) {
                window.addEventListener("scroll", vF19, vO3);
                v131 = true;
              }
            };
            var vVF18 = vF18;
            var vVF19 = vF19;
            var vVF20 = vF20;
            let v130 = v35.querySelector(".episodes-pagination-final");
            let v131 = !1;
            document.body.addEventListener("click", function (p39) {
              let v132 = p39.target.closest(".ep-range-dropdown-toggle");
              let v133 = p39.target.closest(".ep-range-tab");
              let v134 = document.querySelector(".ep-range-dropdown-menu.is-open-globally");
              if (v132) {
                p39.preventDefault();
                p39.stopPropagation();
                let v135 = v132.nextElementSibling;
                if (v135 && v135.classList.contains("is-open-globally")) {
                  vF18();
                } else if (v135) {
                  vF20(v132, v135);
                }
              } else if (v133) {
                p39.preventDefault();
                let vParseInt2 = parseInt(v133.dataset.page, 10);
                if (p39.target.closest(".ep-range-dropdown-menu")) {
                  vF18();
                }
                vF12(vParseInt2);
                vF13(vParseInt2);
              } else if (v134 && !p39.target.closest(".ep-range-dropdown")) {
                vF18();
              }
            });
            v35.querySelector(".episodes-grid-container-final").addEventListener("click", p40 => {
              let v136 = p40.target.closest(".ep-button");
              if (v136) {
                p40.preventDefault();
                vF11(parseInt(v136.dataset.epIndex, 10));
              }
            });
            v114.addEventListener("click", () => vF11(vLN05 - 1));
            v115.addEventListener("click", () => vF11(vLN05 + 1));
          }
          let v137 = v35.querySelector("#comment-btn");
          if (v137) {
            v137.addEventListener("click", () => {
              let v138 = document.querySelector("#comments");
              if (v138) {
                v138.scrollIntoView({
                  behavior: "smooth"
                });
              }
            });
          }
          v111.addEventListener("click", () => {
            v97.src = v97.src;
          });
          v112.addEventListener("click", () => {
            if (v97.requestFullscreen) {
              v97.requestFullscreen();
            }
          });
          v113.addEventListener("change", () => {
            if (v113.checked) {
              v97.setAttribute("sandbox", "allow-scripts allow-same-origin");
            } else {
              v97.removeAttribute("sandbox");
            }
          });
          let vVF177 = vF17("#extra-meta .meta-season");
          if (vVF177) {
            v117.textContent = vVF177;
          }
          if (!v118 && v105) {
            v97.src = vO2[v105][0].href;
          }
        } else {
          let v139 = v81.querySelector("iframe");
          if (v139 && v139.src) {
            v97.src = v139.src;
          }
          v35.querySelector("#episodes-section").style.display = "none";
          v35.querySelector(".footer-group-middle").style.display = "none";
        }
        let v140 = v35.querySelector(".info-modal-final");
        let v141 = v35.querySelector(".introduction-link-final");
        let v142 = v140.querySelector(".modal-close-btn");
        if (v141 && v140 && v142) {
          let vF21 = p41 => {
            p41.preventDefault();
            if (window.innerWidth <= 767) {
              v140.classList.add("is-open-mobile");
            } else {
              v140.style.display = "block";
            }
          };
          let vF22 = () => {
            if (window.innerWidth <= 767) {
              v140.classList.remove("is-open-mobile");
            } else {
              v140.style.display = "none";
            }
          };
          v141.addEventListener("click", vF21);
          v142.addEventListener("click", vF22);
        }
        v35.classList.add("loaded");
        if (window.innerWidth <= 767) {
          let v143 = document.querySelector(".player-column-final");
          let v144 = document.querySelector("article.item-post");
          if (v143 && v144) {
            v144.prepend(v143);
          }
        }
      } catch (e5) {
        console.error("Error initializing custom player layout:", e5);
        if (document.querySelector(".item-post")) {
          let v145 = document.getElementById("source-data-container");
          if (v145) {
            v145.style.display = "block";
          }
        }
        if (v35) {
          v35.style.display = "none";
        }
      }
      try {
        var vDecodeURIComponent = decodeURIComponent(window.location.pathname);
        var v146 = document.querySelectorAll(".mobile-nav a");
        var v147 = null;
        v146.forEach(function (p42) {
          var v148 = new URL(p42.href).pathname;
          if (v148 === "/" && vDecodeURIComponent === "/" || v148 !== "/" && vDecodeURIComponent.startsWith(v148) && (!v147 || v148.length > new URL(v147.href).pathname.length)) {
            v147 = p42;
          }
        });
        if (v147) {
          v147.classList.add("active");
        } else if (vDecodeURIComponent === "/") {
          document.querySelector(".mobile-nav a[href=\"/\"]").classList.add("active");
        }
      } catch (e6) {
        console.error("Error setting active mobile link:", e6);
      }
    }
  });
  $(document).ready(function () {
    $(document).on("click", ".header-carousel-nav .header-nav-btn", function () {
      var v$2 = $(this);
      var v149 = v$2.data("target");
      var v$3 = $(v149);
      if (v$3.length) {
        var v150 = v$3.data("owl.carousel");
        if (!v150) {
          return;
        }
        var v151;
        var v152 = window.innerWidth;
        if (v152 < 768) {
          v151 = 3;
        } else if (v152 < 1024) {
          v151 = 4;
        } else {
          v151 = 6;
        }
        var v153 = v150.current();
        if (v$2.hasClass("prev")) {
          var v155 = Math.max(0, v153 - v151);
          v$3.trigger("to.owl.carousel", [v155, 300]);
        } else if (v$2.hasClass("next")) {
          var v155 = Math.min(v150.items().length - v151, v153 + v151);
          v$3.trigger("to.owl.carousel", [v155, 300]);
        }
      }
    });
    function f2() {
      let v156 = $(".widget.HTML h3.title:contains('Continue Watching')").closest(".widget");
      if (!v156.length) {
        return;
      }
      let v157 = v156.find(".widget-header");
      if (v157.length && v157.find(".header-controls").length === 0) {
        v157.append("\n            <div class='header-controls'>\n              <a class='carousel-view-switch' href='/p/history.html'>\n                <span>View All</span>\n                <svg fill='none' viewBox='0 0 24 24'><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 18l6-6-6-6'/></svg>\n              </a>\n            </div>");
      }
      let v158 = v156.find(".widget-content");
      let v159 = JSON.parse(localStorage.getItem("watchHistoryIDs") || "[]");
      if (v159.length === 0) {
        v156.hide();
        return;
      }
      v156.show();
      let v160 = $(".sidebar-logo .logo-text").text().trim() || "Loading...";
      let v161 = "<div class=\"popular-posts-skeleton\">" + Array.from({
        length: Math.min(v159.length, 6)
      }, () => "<div class=\"skeleton-post-item\"><div class=\"skeleton-image-placeholder\"><span class=\"skeleton-card-text\">" + v160 + "</span></div><div class=\"skeleton-title-placeholder\"></div></div>").join("") + "</div>";
      v158.html(v161);
      new IntersectionObserver((p43, p44) => {
        p43.forEach(p45 => {
          if (p45.isIntersecting) {
            let v162 = v159.slice(0, 10).map(p46 => $.ajax({
              url: "/feeds/posts/default/" + p46 + "?alt=json-in-script",
              dataType: "jsonp"
            }).then(p47 => {
              if (!p47.entry) {
                window.removeFromHistory(p46);
                return null;
              }
              let v163 = p47.entry;
              let v164 = document.createElement("div");
              v164.innerHTML = v163.content.$t;
              let v165 = (v164.querySelector("img[alt=\"poster\"]")?.src || "").replace(/\/s\d+(-[a-z0-9]+)*\//, "/s400-rw/");
              let v166 = $(v164).find("#extra-meta .meta-type").text().trim();
              let v167 = $(v164).find("#extra-meta .meta-rating").text().trim();
              let v168 = $(v164).find("#extra-meta .meta-year").text().trim();
              let v169 = JSON.parse(localStorage.getItem("abefilmWatchProgress") || "{}");
              let v170 = v164.querySelector("#episodes-data ul[data-server-name]");
              let v171 = v170 ? v170.querySelectorAll("a").length : 0;
              let v172 = v169["post-" + p46] || 0;
              return {
                id: p46,
                title: v163.title.$t,
                url: v163.link.find(p48 => p48.rel === "alternate").href,
                imageUrl: v165 || "https://resources.blogblog.com/img/blank.gif",
                type: v166 === "TV Series" ? "TV" : "MOVIE",
                totalEpisodes: v171,
                currentEpisode: v172 + 1,
                progressPercent: v171 > 0 ? Math.min(100, (v172 + 1) / v171 * 100) : 100,
                rating: v167,
                year: v168
              };
            }).fail(() => {
              window.removeFromHistory(p46);
              return null;
            }));
            Promise.all(v162).then(p49 => {
              let v173 = p49.filter(Boolean);
              if (v173.length === 0) {
                v156.hide();
                return;
              }
              let vLS2 = "";
              v173.forEach(p50 => {
                let vLS3 = "";
                let vLS4 = "";
                if (p50.progressPercent > 0 && p50.totalEpisodes > 0) {
                  vLS3 = "<div class=\"cw-progress-info\"><div class=\"cw-progress-meta\"><span class=\"ep-current\">EP " + p50.currentEpisode + "</span><span class=\"ep-count\"><span class=\"current\">" + p50.currentEpisode + "</span> / " + p50.totalEpisodes + "</span></div><div class=\"progress-bar-container\"><div class=\"progress-bar-fill\" style=\"width: " + p50.progressPercent + "%;\"></div></div>";
                  vLS4 = "<div class=\"progress-bar-overlay\"><div class=\"progress-bar-fill\" style=\"width: " + p50.progressPercent + "%;\"></div></div>";
                }
                vLS2 += "\n    <article class=\"index-post continue-watching-item\" data-post-id=\"" + p50.id + "\">\n                                <a class=\"entry-image-wrap\" href=\"" + p50.url + "\" title=\"" + p50.title + "\">\n                                    <span class=\"entry-image\" data-image=\"" + p50.imageUrl + "\"></span>\n                                    <span class=\"cw-type-tag\">" + p50.type + "</span>\n                                    <button class=\"cw-remove-btn\" title=\"Remove from History\">&times;</button>\n                                    " + vLS4 + "\n                                    <div class=\"thumb-meta-overlay\">\n                                        " + (p50.rating ? "\n                                            <span class=\"thumb-rating\">\n                                                <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" style=\"width: 11px; height: 11px; vertical-align: text-bottom; margin-right: 4px;\">\n                                                    <path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>\n                                                </svg> \n                                                " + p50.rating + "\n                                            </span>\n                                        " : "<span></span>") + "\n                                        " + (p50.year ? "<span class=\"thumb-year\">" + p50.year + "</span>" : "") + "\n                                    </div>\n                                </a>\n                                <div class=\"entry-header\">\n                                    <h2 class=\"entry-title\"><a href=\"" + p50.url + "\">" + p50.title + "</a></h2>\n                                    " + vLS3 + "\n                                </div>\n                            </article>";
              });
              var vLSContinuewatchingcaro = "continue-watching-carousel";
              const vO6 = {
                autoWidth: !0,
                margin: 8,
                stagePadding: 16
              };
              const vO9 = {
                "0": vO6,
                "768": {
                  items: 4,
                  margin: 10,
                  stagePadding: 0
                },
                "1024": {
                  items: 6,
                  stagePadding: 0
                }
              };
              v158.html("<div class=\"index-post-wrap owl-carousel owl-theme\" id=\"" + vLSContinuewatchingcaro + "\">" + vLS2 + "</div>");
              f5();
              v158.find(".owl-carousel").owlCarousel({
                loop: !1,
                margin: 10,
                nav: !0,
                dots: !1,
                navText: ["<svg fill=\"none\" viewBox=\"0 0 24 24\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 18l-6-6 6-6\"/></svg>", "<svg fill=\"none\" viewBox=\"0 0 24 24\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 6l6 6-6 6\"/></svg>"],
                responsive: vO9
              });
            });
            p44.unobserve(p45.target);
          }
        });
      }, {
        rootMargin: "0px 0px 300px 0px"
      }).observe(v156[0]);
      v158.on("click", ".cw-remove-btn", function (p51) {
        p51.preventDefault();
        p51.stopPropagation();
        var v174 = $(this).closest(".continue-watching-item");
        var v175 = v174.data("post-id");
        if (v175 && typeof window.removeFromHistory == "function") {
          window.removeFromHistory(v175);
        }
        var v$4 = $("#continue-watching-carousel");
        var v176 = v$4.data("owl.carousel");
        if (v176 && v176.items().length > 0) {
          if (v176.items().length === 1) {
            v156.hide();
          } else {
            var v177 = v174.closest(".owl-item").index();
            v$4.trigger("remove.owl.carousel", [v177]).trigger("refresh.owl.carousel");
          }
        }
      });
    }
    if (window.innerWidth > 1023 && $("body").hasClass("item-view")) {
      let v178 = document.body;
      const vO10 = {
        childList: !0,
        subtree: !0
      };
      new MutationObserver((p52, p53) => {
        let v$5 = $("#comments");
        let v$6 = $(".recommendation-section");
        let v$7 = $(".most-popular-sidebar");
        let v$8 = $(".post-page-final-container");
        if (v$5.length && v$6.length && v$7.length && v$8.length && !v$8.hasClass("layout-processed")) {
          p53.disconnect();
          v$8.addClass("layout-processed");
          v$5.detach();
          v$6.detach();
          v$7.detach();
          let v$9 = $("<div class=\"post-footer-container\"></div>");
          let v$10 = $("<div class=\"post-footer-main-content\"></div>");
          v$10.append(v$5);
          v$10.append(v$6);
          v$9.append(v$10);
          v$9.append(v$7);
          v$8.after(v$9);
          $("#video-tab-content .post-footer-container, #comment-tab-content .post-footer-container").remove();
        }
      }).observe(v178, vO10);
    }
    function f3() {
      var vDecodeURIComponent2 = decodeURIComponent(window.location.pathname);
      if (vDecodeURIComponent2 === "/") {
        $("#main-menu #LinkList1 .tm-channel a[href=\"/\"]").addClass("menu_0");
        return;
      }
      $("#main-menu #LinkList1 .tm-channel a").each(function () {
        var v179 = $(this).attr("href");
        if (v179 !== "/" && vDecodeURIComponent2 === v179) {
          $(this).addClass("menu_0");
        } else {
          $(this).removeClass("menu_0");
        }
      });
    }
    function f4(p54) {
      $(p54 + " .entry-image[data-image]").each(function () {
        var v180 = $(this).attr("data-image");
        if (v180 && v180.includes("googleusercontent")) {
          $(this).attr("data-image", v180.replace(/\/(s|w|h)\d+(-[a-z0-9]+)*\//, "/s720/"));
        }
      });
    }
    function f5() {
      var vLN200 = 200;
      var v181 = $(window).width() + vLN200;
      var v182 = $(window).height() + vLN200;
      $(".entry-image[data-image]:not(.lazyloaded)").each(function () {
        var v$11 = $(this);
        var v183 = v$11[0].getBoundingClientRect();
        if (v183.width > 0 && v183.height > 0 && v183.top < v182 && v183.bottom > -vLN200 && v183.left < v181 && v183.right > -vLN200) {
          v$11.css("background-image", "url(\"" + v$11.attr("data-image") + "\")").addClass("lazyloaded");
        }
      });
    }
    function f6() {
      let v$12 = $("#dynamic-main-slider");
      if (!v$12.length) {
        return;
      }
      let v184 = null;
      let v185 = window.location.pathname;
      if (v185.startsWith("/search/label/")) {
        v184 = decodeURIComponent(v185.split("/search/label/")[1].replace(/\/$/, ""));
      }
      if (v185 !== "/" && !v184) {
        v$12.closest(".content-slider").hide();
        return;
      }
      let v186 = v184 ? "slider_cache_" + v184 : "slider_cache_homepage";
      let v187 = v184 ? "/feeds/posts/default/-/" + encodeURIComponent(v184) + "?alt=json-in-script&max-results=5" : "/feeds/posts/default?alt=json-in-script&max-results=5";
      let vLN86400000 = 86400000;
      let vLSsvgWidth60pxHeight60 = "<svg width=\"60px\" height=\"60px\" viewBox=\"0 0 60 60\"><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#FFFFFF\" cx=\"30\" cy=\"30\" r=\"30\"></circle><path d=\"M29.3055556,17.25 C29.6890866,17.25 30,17.5609134 30,17.9444444 L30,19.3888889 C30,19.77242 29.6890866,20.0833333 29.3055556,20.0833333 L22.9166667,20.0833333 L22.9166667,39.724 L28.6396082,34.9562398 C29.3713667,34.346441 30.4106369,34.302884 31.1863257,34.8255686 L31.3603918,34.9562398 L37.0833333,39.7254167 L37.0833333,33.5277778 C37.0833333,33.1442467 37.3942467,32.8333333 37.7777778,32.8333333 L39.2222222,32.8333333 C39.6057533,32.8333333 39.9166667,33.1442467 39.9166667,33.5277778 L39.9166667,41.2376789 C39.9166667,42.4112764 38.9652794,43.3627321 37.7916667,43.3627321 C37.3655561,43.3627321 36.9510168,43.2346313 36.6007867,42.9976358 L36.4312748,42.8701491 L30,37.50975 L23.5687252,42.8701491 C22.7234861,43.574515 21.4929682,43.5114751 20.7233835,42.7579578 L20.5758631,42.5980707 C20.3030814,42.2707327 20.1360669,41.8703014 20.0939154,41.4495208 L20.0833333,41.2376789 L20.0833333,20.0833333 C20.0833333,18.5896541 21.2391602,17.3659327 22.7052117,17.2577715 L22.9166667,17.25 L29.3055556,17.25 Z M39.2222222,17.25 C39.6057533,17.25 39.9166667,17.5609134 39.9166667,17.9444444 L39.9163333,21.499 L43.4722222,21.5 C43.8557533,21.5 44.1666667,21.8109134 44.1666667,22.1944444 L44.1666667,23.6388889 C44.1666667,24.02242 43.8557533,24.3333333 43.4722222,24.3333333 L39.9163333,24.333 L39.9166667,27.8888889 C39.9166667,28.27242 39.6057533,28.5833333 39.2222222,28.5833333 L37.7777778,28.5833333 C37.3942467,28.5833333 37.0833333,28.27242 37.0833333,27.8888889 L37.0823333,24.333 L33.5277778,24.3333333 C33.1442467,24.3333333 32.8333333,24.02242 32.8333333,23.6388889 L32.8333333,22.1944444 C32.8333333,21.8109134 33.1442467,21.5 33.5277778,21.5 L37.0823333,21.499 L37.0833333,17.9444444 C37.0833333,17.5609134 37.3942467,17.25 37.7777778,17.25 L39.2222222,17.25 Z\" fill=\"#111319\" fill-rule=\"nonzero\"></path></g></svg>";
      let vLSsvgViewBox006060circ = "<svg viewBox=\"0 0 60 60\"><circle fill=\"#fff\" cx=\"30\" cy=\"30\" r=\"30\"></circle><path d=\"M29.3,17.25C29.7,17.25,30,17.56,30,17.94V19.38C30,19.77,29.7,20.08,29.3,20.08H22.91V39.72L28.64,34.95C29.37,34.34,30.41,34.3,31.18,34.82L37.08,39.72V33.52C37.08,33.14,37.39,32.83,37.77,32.83H39.22C39.6,32.83,39.91,33.14,39.91,33.52V41.23C39.91,42.41,38.96,43.36,37.79,43.36C37.36,43.36,36.95,43.23,36.6,42.99L30,37.5L23.56,42.87C22.72,43.57,21.49,43.51,20.72,42.75C20.3,42.27,20.13,41.87,20.08,41.23V20.08C20.08,18.58,21.23,17.36,22.7,17.25H29.3Z\" fill=\"#111319\" fill-rule=\"nonzero\"></path><path d=\"M33 23L37 27L44 18\" stroke=\"#111319\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>";
      function f7() {
        if (typeof window.isItemInWatchlist != "function") {
          setTimeout(f7, 100);
          return;
        }
        $("#dynamic-main-slider .slider-btn.add-btn").each(function () {
          let v$13 = $(this);
          let v188 = v$13.attr("data-post-id");
          if (window.isItemInWatchlist(v188)) {
            v$13.addClass("added").html(vLSsvgViewBox006060circ);
          } else {
            v$13.removeClass("added").html(vLSsvgWidth60pxHeight60);
          }
        });
      }
      function f8(p55) {
        v$12.html(p55);
        f7();
        v$12.owlCarousel({
          items: 1,
          loop: !0,
          autoplay: !0,
          autoplayTimeout: 5000,
          dots: !0,
          nav: !0,
          startPosition: 0,
          navText: ["<button type=\"button\" class=\"owl-prev\" aria-label=\"Previous Slide\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/></svg></button>", "<button type=\"button\" class=\"owl-next\" aria-label=\"Next Slide\"><svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z\"/></svg></button>"]
        });
        v$12.trigger("refresh.owl.carousel");
        let vF23 = function (p56) {
          var v189 = $(p56.target).find(".owl-item").eq(p56.item.index);
          v189.add(v189.next()).add(v189.prev()).each(function () {
            var v190 = $(this).find(".lazy-bg");
            if (v190.length && v190.data("bg-image")) {
              v190.css("background-image", "url(" + v190.data("bg-image") + ")").removeClass("lazy-bg");
            }
          });
        };
        v$12.on("initialized.owl.carousel translated.owl.carousel", vF23);
      }
      function f9() {
        $.ajax({
          url: v187,
          type: "get",
          dataType: "jsonp",
          success: function (p57) {
            if (!p57.feed.entry || p57.feed.entry.length === 0) {
              v$12.closest(".content-slider").hide();
              return;
            }
            var v191 = p57.feed.entry.map(function (p58, p59) {
              var v192 = p58.link.find(p60 => p60.rel == "alternate").href;
              if (!v192) {
                return $.Deferred().reject().promise();
              }
              var v193 = p58.id.$t.split(".post-")[1];
              return $.get(v192).then(function (p61) {
                var v$14 = $(p61);
                var v194 = v$14.find("span.slider-backdrop").text().trim() || v$14.find("img[alt=\"poster\"]").attr("src");
                v194 &&= v194.replace(/\/s\d+(-[a-z0-9]+)*\//, "/w1280-h720-c/").replace(/\/t\/p\/w\d+[^/]*\//, "/t/p/original/");
                var v195 = v$14.find(".entry-title").text().trim();
                var v196 = v$14.find(".post-body p").first().text().trim();
                var v197 = v$14.find(".meta-title-logo");
                var v198 = v197.find("img").attr("src") || v197.text().trim();
                var vO11 = {
                  titleLogo: v198,
                  rating: v$14.find(".meta-rating").text().trim(),
                  year: v$14.find(".meta-year").text().trim(),
                  pg: v$14.find(".meta-pg").text().trim(),
                  country: v$14.find(".meta-country").text().trim(),
                  genres: v$14.find(".meta-genre").map(function () {
                    return $(this).text().trim();
                  }).get(),
                  imdb: v$14.find(".meta-imdb").text().trim(),
                  language: v$14.find(".meta-language").text().trim()
                };
                var v199 = "<div class=\"slider-item\">" + (p59 === 0 ? "<div class=\"slider-background-image\" style=\"background-image: url('" + v194 + "');\"></div>" : "<div class=\"slider-background-image lazy-bg\" data-bg-image=\"" + v194 + "\"></div>") + "<div class=\"slider-shadow-overlay\"></div><div class=\"slider-info-container\">";
                if (vO11.titleLogo && vO11.titleLogo.startsWith("http")) {
                  var v200 = vO11.titleLogo.replace("/original/", "/w300/");
                  v199 += "<img src=\"" + v200 + "\" alt=\"" + v195 + " Logo\" class=\"slider-title-logo\">";
                } else {
                  v199 += "<h2 class=\"slider-title-main\">" + v195 + "</h2>";
                }
                v199 += "<div class=\"slider-styled-badge\"><span class=\"badge-part-one\">TOP " + (p59 + 1) + "</span><span class=\"badge-part-two\">Featured</span></div>";
                v199 += "<div class=\"slider-meta-line\">";
                if (vO11.imdb) {
                  v199 += "<span class=\"meta-item imdb-rating\"><div class=\"imdb-logo-bg\"></div>" + vO11.imdb + "</span>";
                } else if (vO11.rating) {
                  v199 += "<span class=\"meta-item star\">★ " + vO11.rating + "</span>";
                }
                if (vO11.year) {
                  v199 += "<span class=\"meta-item\">" + vO11.year + "</span>";
                }
                if (vO11.pg) {
                  v199 += "<span class=\"meta-item\">" + vO11.pg + "</span>";
                }
                if (vO11.country) {
                  v199 += "<span class=\"meta-item\">" + vO11.country + "</span>";
                }
                v199 += "</div>";
                v199 += "<div class=\"slider-meta-line genres\">";
                if (vO11.genres.length > 0) {
                  vO11.genres.forEach(function (p62) {
                    v199 += "<span class=\"genre-tag\">" + p62 + "</span>";
                  });
                }
                v199 += "</div>";
                v199 += "<p class=\"slider-caption\">" + (v196 ? v196.substring(0, 150) + "..." : "") + "</p>";
                v199 += "<div class=\"slider-buttons\"><a href=\"" + v192 + "\" class=\"slider-btn play-btn\" title=\"Watch Now\"><svg viewBox=\"0 0 60 60\"><g fill=\"none\" fill-rule=\"evenodd\" stroke=\"none\" stroke-width=\"1\"><circle cx=\"30\" cy=\"30\" fill=\"transparent\" r=\"30\"></circle><path d=\"M35.7461509,22.4942263 L45.1405996,36.5858994 C46.059657,37.9644855 45.6871354,39.8270935 44.3085493,40.7461509 C43.8157468,41.0746859 43.2367237,41.25 42.6444487,41.25 L23.8555513,41.25 C22.198697,41.25 20.8555513,39.9068542 20.8555513,38.25 C20.8555513,37.657725 21.0308654,37.078702 21.3594004,36.5858994 L30.7538491,22.4942263 C31.6729065,21.1156403 33.5355145,20.7431187 34.9141006,21.662176 C35.2436575,21.8818806 35.5264463,22.1646695 35.7461509,22.4942263 Z\" fill=\"#FFFFFF\" transform=\"translate(33.250000, 30.000000) rotate(-270.000000) translate(-33.250000, -30.000000) \"></path></g></svg></a><a href=\"#\" class=\"slider-btn add-btn\" title=\"Add to Watchlist\" aria-label=\"Add to Watchlist\" data-post-id=\"" + v193 + "\" data-post-title=\"" + v195 + "\" data-post-url=\"" + v192 + "\" data-post-image=\"" + v194 + "\">" + vLSsvgWidth60pxHeight60 + "</a></div>";
                v199 += "</div></div>";
                return v199;
              });
            });
            $.when.apply($, v191).done(function () {
              var v201 = Array.prototype.slice.call(arguments).join("");
              let vO12 = {
                timestamp: Date.now(),
                slidesHtml: v201
              };
              localStorage.setItem(v186, JSON.stringify(vO12));
              f8(v201);
            });
          },
          error: function () {
            v$12.closest(".content-slider").hide();
          }
        });
      }
      let v202 = localStorage.getItem(v186);
      if (v202) {
        let v203 = JSON.parse(v202);
        f8(v203.slidesHtml);
        if (Date.now() - v203.timestamp > vLN86400000) {
          f9();
        }
      } else {
        v$12.html("<div class=\"slider-item is-loading\"><div class=\"slider-background-image\"></div></div>").owlCarousel({
          items: 1
        });
        f9();
      }
    }
    function f10(p63, p64) {
      var v204 = p63.closest(".widget").find(".widget-title .title").text().trim();
      var v205 = $.extend({
        maxResults: 12,
        label: null,
        style: "nowrap",
        sortBy: null
      }, p64);
      let vA3 = ["Action", "Action & Adventure", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Kids", "Music", "Mystery", "Reality", "Romance", "Sci-Fi & Fantasy", "Science Fiction", "Thriller", "War", "Western"];
      var v206 = p63.closest(".widget");
      var v207 = v205.label === "_auto_" && !$("body").is(".item-view, .item-page");
      if (v207) {
        v206.hide();
        return;
      }
      if (!v205.label && v205.label !== null) {
        p63.html("<span class=\"error-msg\">No category specified for this widget.</span>");
        return;
      }
      var v208 = v205.sortBy === "rating" ? 50 : v205.maxResults;
      var v209 = "/feeds/posts/default" + (v205.label ? "/-/" + encodeURIComponent(v205.label) : "") + "?alt=json-in-script&max-results=" + v208;
      $.ajax({
        url: v209,
        dataType: "jsonp",
        success: function (p65) {
          var v210 = p65.feed && p65.feed.entry ? p65.feed.entry : [];
          if (v210.length === 0) {
            p63.html("<span class=\"error-msg\">No posts found for this genre.</span>");
            return;
          }
          let v211 = v210.map(function (p66) {
            let v212 = document.createElement("div");
            v212.innerHTML = p66.content.$t;
            let v$15 = $(v212);
            let v213 = p66.id.$t.split(".post-")[1];
            let v214 = (p66.category || []).map(p67 => p67.term).find(p68 => vA3.includes(p68)) || "";
            return {
              id: v213,
              label: v214,
              link: (p66.link.find(p69 => p69.rel === "alternate") || {}).href,
              title: p66.title.$t,
              imageUrl: (v$15.find("span.slider-backdrop").text().trim() || v$15.find("img[alt=\"poster\"]").attr("src") || "https://resources.blogblog.com/img/blank.gif").replace(/\/s\d+(-[a-z0-9]+)*\//, "/s400-rw/").replace(/\/t\/p\/w\d+[^/]*\//, "/t/p/w780/"),
              rating: v$15.find("#extra-meta .meta-rating").text().trim(),
              type: v$15.find("#extra-meta .meta-type").text().trim(),
              year: v$15.find("#extra-meta .meta-year").text().trim(),
              synopsis: v$15.find("#overview-data").text().trim(),
              genres: v$15.find("#extra-meta .meta-genre").map(function () {
                return $(this).text().trim();
              }).get(),
              subtitles: v$15.find("#extra-meta .meta-subtitles").text().trim(),
              audio: v$15.find("#extra-meta .meta-audio").text().trim(),
              isMature: p66.category ? p66.category.some(p70 => p70.term === "Mature") : !1
            };
          }).filter(p71 => p71.link);
          if (v205.sortBy === "rating") {
            v211.sort((p72, p73) => parseFloat(p73.rating || 0) - parseFloat(p72.rating || 0));
          }
          v211 = v211.slice(0, v205.maxResults);
          var vLS5 = "";
          v211.forEach(function (p74, p75) {
            var v215 = p75 + 1;
            var v216 = p74.label ? "<span class=\"entry-label\">" + p74.label + "</span>" : "";
            if (v205.style === "wide-list") {
              let vLS6 = "";
              if (v215 === 1) {
                vLS6 = "rank-gold";
              } else if (v215 === 2) {
                vLS6 = "rank-blue";
              } else if (v215 === 3) {
                vLS6 = "rank-green";
              }
              var v223 = p74.rating ? "<span class=\"item-rating\"><svg class=\"g-star\" viewBox=\"0 0 24 24\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>" + p74.rating + "</span>" : "";
              let v218 = p74.type === "TV Series" ? "TV" : p74.type;
              var v227 = p74.type ? "<span class=\"type-tag " + p74.type.toLowerCase().replace(/\s+/g, "-") + "\">" + v218 + "</span>" : "";
              var v220 = p74.year ? "<span class=\"item-year\">" + p74.year + "</span>" : "";
              var v222 = p74.genres.slice(0, 2).map(p76 => "<span class=\"genre-tag\">" + p76 + "</span>").join("");
              vLS5 += "<a class=\"wide-list-item\" href=\"" + p74.link + "\" title=\"" + p74.title + "\"><div class=\"item-thumb\"><img src=\"" + p74.imageUrl + "\" alt=\"" + p74.title + "\" loading=\"lazy\"/><div class=\"rank-badge " + vLS6 + "\">" + v215 + "</div></div><div class=\"item-info\"><h4 class=\"item-title\">" + p74.title + "</h4><div class=\"item-meta-group\">" + v220 + v223 + v227 + "</div><div class=\"item-genres\">" + v222 + "</div><p class=\"item-synopsis\">" + (p74.synopsis || "") + "</p></div></a>";
            } else if (v205.style === "ranked-grid-alt") {
              var v222 = p74.genres.slice(0, 3).map(p77 => "<span class=\"tag\">" + p77 + "</span>").join("");
              vLS5 += "<div class=\"ranked-grid-alt-item\"><a class=\"item-thumb\" href=\"" + p74.link + "\" title=\"" + p74.title + "\"><img src=\"" + p74.imageUrl + "\" alt=\"" + p74.title + "\" loading=\"lazy\"/></a><span class=\"rank-number\">" + v215 + "</span><div class=\"item-info\"><h4 class=\"item-title\"><a href=\"" + p74.link + "\">" + p74.title + "</a></h4><div class=\"item-tags\">" + v222 + "</div></div></div>";
            } else if (v205.style === "top-list") {
              var v223 = p74.rating ? "<span class=\"item-rating\">" + p74.rating + "</span>" : "";
              var v224 = p74.subtitles ? "<span class=\"item-cc\">CC " + p74.subtitles + "</span>" : "";
              var v225 = p74.audio ? "<span class=\"item-audio\"><svg viewBox=\"0 0 24 24\" width=\"1em\" height=\"1em\" fill=\"currentColor\" style=\"vertical-align: -2px; margin-right: 4px;\"><path d=\"M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z\"></path></svg>" + p74.audio + "</span>" : "";
              var v226 = p74.type && p74.type.toLowerCase().replace(/\s+/g, "-") || "movie";
              var v227 = p74.type ? "<span class=\"type-tag " + v226 + "\">" + p74.type + "</span>" : "";
              vLS5 += "<div class=\"top-list-item\"><div class=\"rank-badge top-" + v215 + "\">" + v215 + "</div><div class=\"item-info\"><h4 class=\"item-title\"><a href=\"" + p74.link + "\">" + p74.title + "</a></h4><div class=\"item-footer\">" + v223 + v224 + v225 + v227 + "</div></div><a class=\"item-thumb\" href=\"" + p74.link + "\" title=\"" + p74.title + "\"><img src=\"" + p74.imageUrl + "\" alt=\"" + p74.title + "\" loading=\"lazy\"/></a></div>";
            } else {
              var v228 = p74.isMature ? " is-mature" : "";
              vLS5 += "<article class=\"index-post" + v228 + "\" data-post-id=\"" + p74.id + "\"><a class=\"entry-image-wrap\" href=\"" + p74.link + "\" title=\"" + p74.title + "\"><span class=\"entry-image\" data-image=\"" + p74.imageUrl + "\"></span>" + v216 + "<div class=\"thumb-meta-overlay\"><span class=\"thumb-meta thumb-duration\"></span><span class=\"thumb-meta thumb-rating\"></span></div></a><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + p74.link + "\">" + p74.title + "</a></h2><div class=\"card-sub-meta\"><div class=\"sub-meta-left\"><span class=\"sub-meta-type\"></span><span class=\"sub-meta-year\"></span></div><div class=\"sub-meta-right\"><span class=\"sub-meta-cc\"></span><span class=\"sub-meta-mic\"></span></div></div></div></article>";
            }
          });
          var v229;
          var v230 = "abefilm-carousel-" + Math.random().toString(36).substring(2, 9);
          if (v205.style === "nowrap" || v205.style === "wide-list") {
            v229 = "<div class=\"index-post-wrap owl-carousel owl-theme entry-slider\" id=\"" + v230 + "\">" + vLS5 + "</div>";
          } else if (v205.style === "grid") {
            v229 = "<div class=\"index-post-wrap\">" + vLS5 + "</div>";
          } else if (v205.style === "ranked-grid-alt") {
            v229 = "<div class=\"ranked-grid-alt-widget-content\">" + vLS5 + "</div>";
          } else if (v205.style === "top-list") {
            v229 = "<div class=\"top-list-widget-content\">" + vLS5 + "</div>";
          } else {
            v229 = "<div class=\"widget-content-inner\">" + vLS5 + "</div>";
          }
          p63.html(v229);
          const vO14 = {
            autoWidth: !0,
            margin: 8
          };
          const vO17 = {
            "0": vO14,
            "768": {
              items: 4,
              margin: 16
            },
            "1024": {
              items: 6
            }
          };
          const vO18 = {
            loop: !1,
            margin: 16,
            nav: !0,
            dots: !1,
            slideBy: "page",
            navText: ["<svg fill=\"none\" viewBox=\"0 0 24 24\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 18l-6-6 6-6\"/></svg>", "<svg fill=\"none\" viewBox=\"0 0 24 24\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 6l6 6-6 6\"/></svg>"],
            responsive: vO17
          };
          let vVO18 = vO18;
          const vO19 = {
            items: 1,
            margin: 12,
            autoWidth: !0,
            stagePadding: 60
          };
          const vO22 = {
            "0": vO19,
            "768": {
              items: 2,
              margin: 16
            },
            "1024": {
              items: 3,
              margin: 20
            }
          };
          if (v205.style === "wide-list") {
            vVO18.responsive = vO22;
          }
          if (v205.style === "nowrap" || v205.style === "wide-list") {
            p63.find(".owl-carousel").owlCarousel(vVO18);
          }
          if (typeof f5 == "function") {
            f5();
          }
          var v231 = p63.find(".owl-nav .owl-prev");
          if (v231.length) {
            v231.removeAttr("role").attr("aria-label", "Previous");
          }
          var v232 = p63.find(".owl-nav .owl-next");
          if (v232.length) {
            v232.removeAttr("role").attr("aria-label", "Next");
          }
          if (typeof f29 == "function") {
            f29();
          }
        },
        error: function () {
          p63.html("<span class=\"error-msg\">Error: Feed could not be loaded.</span>");
        }
      });
    }
    function f11(p78, p79) {
      let vA4 = [];
      let vLN06 = 0;
      const v233 = p78.find(".switch-grid");
      const v234 = p78.find(".switch-button");
      const v235 = p79.maxResults || 6;
      const v236 = p79.label;
      function f12() {
        if (vA4.length === 0) {
          return;
        }
        let v237 = [...vA4].sort(() => 0.5 - Math.random());
        let v238 = v237.slice(0, v235);
        let v239 = v238.map(p80 => {
          const v240 = p80.isMature ? " is-mature" : "";
          const v241 = p80.label ? "<span class=\"entry-label\">" + p80.label + "</span>" : "";
          return "\n            <article class=\"index-post" + v240 + "\" data-post-id=\"" + p80.id + "\">\n              <a class=\"entry-image-wrap\" href=\"" + p80.url + "\" title=\"" + p80.title + "\">\n                <span class=\"entry-image\" data-image=\"" + p80.imageUrl + "\"></span>\n                " + v241 + "\n                <div class=\"thumb-meta-overlay\">\n                  <span class=\"thumb-meta thumb-duration\"></span>\n                  <span class=\"thumb-meta thumb-rating\"></span>\n                </div>\n              </a>\n              <div class=\"entry-header\">\n                <h2 class=\"entry-title\"><a href=\"" + p80.url + "\">" + p80.title + "</a></h2>\n                <div class=\"card-sub-meta\">\n                  <div class=\"sub-meta-left\"><span class=\"sub-meta-type\"></span><span class=\"sub-meta-year\"></span></div>\n                  <div class=\"sub-meta-right\"><span class=\"sub-meta-cc\"></span><span class=\"sub-meta-mic\"></span></div>\n                </div>\n              </div>\n            </article>";
        }).join("");
        v233.html(v239);
        if (typeof f5 === "function") {
          f5();
        }
        if (typeof f29 === "function") {
          f29();
        }
      }
      function f13() {
        if (!v236) {
          v233.html("<p class=\"error-msg\">Error: No label specified for this widget.</p>");
          return;
        }
        $.ajax({
          url: "/feeds/posts/default/-/" + encodeURIComponent(v236) + "?alt=json-in-script&max-results=50",
          dataType: "jsonp",
          success: function (p81) {
            if (p81.feed.entry) {
              let vA5 = ["Action", "Action & Adventure", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Kids", "Music", "Mystery", "Reality", "Romance", "Sci-Fi & Fantasy", "Science Fiction", "Thriller", "War", "Western"];
              vA4 = p81.feed.entry.map(function (p82) {
                let v242 = document.createElement("div");
                v242.innerHTML = p82.content.$t;
                let v243 = ($(v242).find("img[alt=\"poster\"]").attr("src") || "https://resources.blogblog.com/img/blank.gif").replace(/\/s\d+(-[a-z0-9]+)*\//, "/w400-rw/");
                let v244 = (p82.category || []).map(p83 => p83.term).find(p84 => vA5.includes(p84)) || "";
                return {
                  id: p82.id.$t.split(".post-")[1],
                  url: p82.link.find(p85 => p85.rel === "alternate").href,
                  title: p82.title.$t,
                  imageUrl: v243,
                  label: v244,
                  isMature: p82.category ? p82.category.some(p86 => p86.term === "Mature") : false
                };
              });
              if (vA4.length > v235) {
                v234.show();
              }
              f12();
            } else {
              v233.html("<p class=\"error-msg\">No posts found for this category.</p>");
            }
          },
          error: function () {
            v233.html("<p class=\"error-msg\">Error loading posts.</p>");
          }
        });
      }
      v234.on("click", f12);
      f13();
    }
    function f14() {
      let v245 = document.querySelectorAll(".widget-content[data-shortcode*=\"{lazyPosts}\"]");
      let vF24 = (p87, p88) => {
        p87.forEach(p89 => {
          if (p89.isIntersecting) {
            let v246 = p89.target;
            let v$16 = $(v246);
            let v247 = v$16.data("shortcode");
            p88.unobserve(v246);
            if (!v247) {
              return;
            }
            let vO23 = {
              label: (v247.match(/\$label=\{([^}]+)\}/) || [])[1],
              maxResults: parseInt((v247.match(/\$results=\{([^}]+)\}/) || [])[1], 10) || 6,
              style: (v247.match(/\$style=\{([^}]+)\}/) || [])[1] || "nowrap",
              sortBy: (v247.match(/\$sortBy=\{([^}]+)\}/) || [])[1]
            };
            var v248 = v$16.closest(".widget");
            var v249 = v248.find(".widget-header");
            if (v249.length > 0 && vO23.label && vO23.style !== "filtered-switch" && v249.find(".carousel-view-switch").length === 0) {
              var v250 = "/p/leaderboard.html?filter=" + encodeURIComponent(vO23.label);
              var v251 = "<a class=\"carousel-view-switch\" href=\"" + v250 + "\"><span>View All</span><svg fill=\"none\" viewBox=\"0 0 24 24\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 18l6-6-6-6\"/></svg></a>";
              if (v249.find(".header-controls").length === 0) {
                v249.append("<div class=\"header-controls\"></div>");
              }
              v249.find(".header-controls").append(v251);
            }
            if (vO23.style === "filtered-switch") {
              f11(v$16, vO23);
            } else {
              f10(v$16, vO23);
            }
          }
        });
      };
      let v252 = new IntersectionObserver(vF24, {
        rootMargin: "0px 0px 250px 0px"
      });
      v245.forEach(p90 => {
        let v$17 = $(p90);
        let v253 = v$17.data("shortcode") || "";
        let v254 = (v253.match(/\$style=\{([^}]+)\}/) || [])[1] || "nowrap";
        var v255 = $(".sidebar-logo .logo-text").text().trim() || "ABEFILM";
        var vLS7 = "";
        var v256;
        if (v254 === "wide-list") {
          v256 = 3;
          vLS7 = "<div class=\"popular-posts-skeleton\">";
          for (var vLN010 = 0; vLN010 < v256; vLN010++) {
            vLS7 += "\n            <div class=\"skeleton-wide-item\">\n                <div class=\"skeleton-wide-thumb\">\n                    <div class=\"skeleton-rank-badge\"></div>\n                </div>\n                <div class=\"skeleton-wide-info\">\n                    <div class=\"skeleton-line title\"></div>\n                    <div class=\"skeleton-meta-group\">\n                        <span class=\"skeleton-meta-tag\"></span>\n                        <span class=\"skeleton-meta-tag\"></span>\n                        <span class=\"skeleton-meta-tag\"></span>\n                    </div>\n                    <div class=\"skeleton-genre-group\">\n                        <span class=\"skeleton-genre-tag\"></span>\n                        <span class=\"skeleton-genre-tag\"></span>\n                    </div>\n                    <div class=\"skeleton-synopsis-group\">\n                        <div class=\"skeleton-line synopsis-line\"></div>\n                        <div class=\"skeleton-line synopsis-line short\"></div>\n                    </div>\n                </div>\n            </div>";
          }
          vLS7 += "</div>";
        } else if (v254 === "ranked-grid-alt") {
          v256 = parseInt((v253.match(/\$results=\{([^}]+)\}/) || [])[1], 10) || 9;
          vLS7 = "<div class=\"popular-posts-skeleton\">";
          for (var vLN010 = 0; vLN010 < v256; vLN010++) {
            vLS7 += "<div class=\"skeleton-ranked-item\"><div class=\"skeleton-ranked-thumb\"></div><div class=\"skeleton-ranked-rank\"></div><div class=\"skeleton-ranked-info\"><div class=\"skeleton-line title\"></div><div class=\"skeleton-line tags\"></div></div></div>";
          }
          vLS7 += "</div>";
        } else if (v254 === "filtered-switch") {
          let v257 = parseInt((v253.match(/\$results=\{([^}]+)\}/) || [])[1], 10) || 6;
          let vLS8 = "";
          for (let vLN09 = 0; vLN09 < v257; vLN09++) {
            vLS8 += "<div class=\"skeleton-post-item\"><div class=\"skeleton-image-placeholder\"><span class=\"skeleton-card-text\">" + v255 + "</span></div><div class=\"skeleton-title-placeholder\"></div></div>";
          }
          vLS7 = "\n                <div class=\"filtered-switch-widget\">\n                  <div class=\"index-post-wrap switch-grid\">" + vLS8 + "</div>\n                  <div class=\"switch-footer\">\n                    <button class=\"switch-button\" style=\"display: none;\">\n                      <svg fill=\"currentColor\" height=\"18\" viewBox=\"0 0 24 24\" width=\"18\"><path d=\"M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z\"></path></svg>\n                      <span>Switch</span>\n                    </button>\n                  </div>\n                </div>";
        } else {
          v256 = window.innerWidth < 768 ? 3 : window.innerWidth < 1024 ? 4 : 6;
          vLS7 = "<div class=\"popular-posts-skeleton is-carousel\">";
          for (var vLN010 = 0; vLN010 < v256; vLN010++) {
            vLS7 += "<div class=\"skeleton-post-item\"><div class=\"skeleton-image-placeholder\"><span class=\"skeleton-card-text\">" + v255 + "</span></div><div class=\"skeleton-title-placeholder\"></div></div>";
          }
          vLS7 += "</div>";
        }
        v$17.html(vLS7);
        v252.observe(p90);
      });
    }
    function f15() {
      $("#Blog1 .index-post:not(.meta-populated)").each(function () {
        var v$18 = $(this);
        var v258 = v$18.find("a.entry-image-wrap").attr("href");
        if (v258) {
          (function (p91) {
            $.get(v258, function (p92) {
              var v$19 = $(p92);
              var v259 = v$19.find(".meta-rating").text().trim();
              var v260 = v$19.find(".meta-year").text().trim();
              var v261 = p91.find(".entry-header .entry-meta");
              if ((v260 || v259) && v261.length) {
                var vLS9 = "";
                if (v260) {
                  vLS9 += "<span class=\"entry-year\">" + v260 + "</span>";
                }
                if (v259) {
                  vLS9 += "<span class=\"entry-rating\"><svg viewBox=\"0 0 24 24\"><path d=\"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z\"/></svg>" + v259 + "</span>";
                }
                v261.html(vLS9).addClass("loaded");
              }
              p91.addClass("meta-populated");
            });
          })(v$18);
        }
      });
    }
    function f16(p93) {
      var v262 = p93.target;
      setTimeout(function () {
        var v263 = $(v262).closest(".widget-content").find(".header-carousel-nav");
        if (p93.item.count <= p93.page.size) {
          v263.hide();
        } else {
          v263.show();
        }
      }, 50);
    }
    function f17() {
      var v$20 = $("#PopularPosts1");
      if (!v$20.length) {
        return;
      }
      var v264 = v$20.find(".popular-posts-skeleton");
      var v265 = v$20.find("#popular-posts-carousel");
      if (!v265.length || !v264.length) {
        return;
      }
      var vLSPopular_posts_top10_ = "popular_posts_top10_html_cache_v2";
      var vLN21600000 = 21600000;
      function f18(p94) {
        if (!(p94.parent().find(".header-carousel-nav").length > 0)) {
          var v266 = p94.attr("id");
          var v267 = "\n            <div class=\"header-carousel-nav\">\n                <button class=\"header-nav-btn prev\" aria-label=\"Previous\" data-target=\"#" + v266 + "\"><svg fill=\"none\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 18l-6-6 6-6\"/></svg></button>\n                <button class=\"header-nav-btn next\" aria-label=\"Next\" data-target=\"#" + v266 + "\"><svg fill=\"none\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 6l6 6-6 6\"/></svg></button>\n            </div>";
          p94.parent().append(v267);
        }
      }
      const vO24 = {
        autoWidth: !0,
        margin: 8
      };
      const vO27 = {
        "0": vO24,
        "768": {
          items: 4,
          margin: 16
        },
        "1024": {
          items: 6
        }
      };
      const vO28 = {
        loop: !1,
        margin: 16,
        nav: !1,
        dots: !1,
        smartSpeed: 250,
        responsive: vO27,
        onInitialized: f16,
        onResized: f16
      };
      let vVO28 = vO28;
      try {
        let v268 = localStorage.getItem(vLSPopular_posts_top10_);
        if (v268) {
          let v269 = JSON.parse(v268);
          if (Date.now() - v269.timestamp < vLN21600000) {
            v265.html(v269.html);
            v264.remove();
            v265.show();
            v265.owlCarousel(vVO28);
            f18(v265);
            if (typeof f5 == "function") {
              f5();
            }
            if (typeof f29 == "function") {
              f29();
            }
            if (typeof applySafeMode == "function") {
              applySafeMode();
            }
            return;
          }
        }
      } catch (e7) {
        console.error("Could not read popular posts cache.", e7);
      }
      function f19() {
        var v270 = v265.children().get();
        if (v270.length === 0) {
          v$20.hide();
          return;
        }
        var v271 = v270.map(function (p95) {
          var v$21 = $(p95);
          var v272 = v$21.data("post-id");
          if (v272) {
            return fetch("/feeds/posts/default/" + v272 + "?alt=json").then(p96 => p96.ok ? p96.json() : Promise.reject("Failed to fetch")).then(p97 => {
              if (!p97.entry) {
                return;
              }
              if (p97.entry.category ? p97.entry.category.some(p98 => p98.term === "Mature") : false) {
                v$21.addClass("is-mature");
              }
              let v273 = p97.entry.category && p97.entry.category.find(p99 => p99.term !== "Mature")?.term || "";
              let v274 = v$21.find(".entry-label");
              if (v273) {
                v274.text(v273).show();
              } else {
                v274.hide();
              }
              let v275 = document.createElement("div");
              v275.innerHTML = p97.entry.content.$t;
              let v276 = (v275.querySelector("img[alt=\"poster\"]")?.src || "https://resources.blogblog.com/img/blank.gif").replace(/\/s\d+(-[a-z0-9]+)*\//, "/w400-h600-c-rw/");
              v$21.find(".entry-image").attr("data-image", v276);
            }).catch(() => {});
          } else {
            return Promise.resolve();
          }
        });
        Promise.all(v271).finally(function () {
          let v277 = v265.html();
          localStorage.setItem(vLSPopular_posts_top10_, JSON.stringify({
            html: v277,
            timestamp: Date.now()
          }));
          v264.remove();
          v265.show();
          v265.owlCarousel(vVO28);
          f18(v265);
          if (typeof f5 == "function") {
            setTimeout(f5, 100);
          }
          if (typeof f29 == "function") {
            f29();
          }
          if (typeof applySafeMode == "function") {
            applySafeMode();
          }
        });
      }
      f19();
    }
    function f20() {
      let v$22 = $("#HTML8");
      if (!v$22.length) {
        return;
      }
      let v278 = v$22.find(".trending-filter-dropdown");
      let v279 = v$22.find(".trending-filter-btn");
      let v280 = v$22.find("#trending-filter-label");
      let v281 = v$22.find(".trending-filter-menu");
      let v282 = v$22.find(".widget-content");
      function f21(p100, p101) {
        v280.text(p101);
        f10(v282, {
          label: p100 === "_all_" ? null : p100,
          maxResults: 10,
          style: "top-list",
          sortBy: "rating"
        });
      }
      v279.on("click", function (p102) {
        p102.stopPropagation();
        v278.toggleClass("is-open");
      });
      v281.on("click", "li", function () {
        let v$23 = $(this);
        let v283 = v$23.data("label");
        let v284 = v$23.text();
        v281.find("li.active").removeClass("active");
        v$23.addClass("active");
        f21(v283, v284);
        v278.removeClass("is-open");
      });
      $(document).on("click", function () {
        if (v278.hasClass("is-open")) {
          v278.removeClass("is-open");
        }
      });
      v281.find("li[data-label=\"_all_\"]").addClass("active");
      f21("_all_", "All");
    }
    function f22() {
      var vLN12 = 12;
      var v$24 = $(".homepage-filter-buttons");
      if (!v$24.length) {
        return;
      }
      var v$25 = $("#filtered-posts-container");
      if (!v$25.length) {
        return;
      }
      var v$26 = $("#filtered-posts-wrap");
      var v285 = $(".sidebar-logo .logo-text").text().trim();
      let vA6 = ["Action", "Action & Adventure", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Kids", "Music", "Mystery", "Reality", "Romance", "Sci-Fi & Fantasy", "Science Fiction", "Thriller", "War", "Western"];
      function f23(p103) {
        if (p103) {
          var v286 = "/search/label/" + encodeURIComponent(p103) + "?max-results=" + vLN12;
          v$25.show();
          var vLS10 = "";
          for (var vLN011 = 0; vLN011 < 6; vLN011++) {
            vLS10 += "<div class=\"skeleton-post-item\"><div class=\"skeleton-image-placeholder\"><span class=\"skeleton-card-text\">" + v285 + "</span></div><div class=\"skeleton-title-placeholder\"></div></div>";
          }
          v$26.addClass("is-loading").html(vLS10);
          if (v$26.find(".owl-carousel").length) {
            v$26.find(".owl-carousel").trigger("destroy.owl.carousel");
          }
          $.get(v286, function (p104) {
            var v287 = $(p104).find("#Blog1 .index-post");
            if (v287.length === 0) {
              v$26.removeClass("is-loading").html("<p class=\"error-msg\">No posts found for this genre.</p>");
              return;
            }
            var v288 = v287.map(function () {
              var v$27 = $(this);
              var v289 = v$27.find("a.entry-image-wrap").attr("href");
              var v290 = v$27.data("post-id");
              if (!v289 || !v290) {
                return $.Deferred().reject().promise();
              } else {
                return $.ajax({
                  url: "/feeds/posts/default/" + v290 + "?alt=json",
                  dataType: "json"
                }).then(function (p105) {
                  if (!p105.entry) {
                    return null;
                  }
                  let v291 = document.createElement("div");
                  v291.innerHTML = p105.entry.content.$t;
                  let v292 = (v291.querySelector("img[alt=\"poster\"]")?.src || "").replace(/\/s\d+(-[a-z0-9]+)*\//, "/s400-rw/");
                  let v293 = (p105.entry.category || []).map(p106 => p106.term).find(p107 => vA6.includes(p107)) || "";
                  return {
                    id: v290,
                    link: v289,
                    title: p105.entry.title.$t,
                    label: v293,
                    imageUrl: v292 || "https://resources.blogblog.com/img/blank.gif"
                  };
                });
              }
            }).get();
            $.when.apply($, v288).done(function () {
              var vLS11 = "";
              var v294 = Array.prototype.slice.call(arguments);
              v294.forEach(function (p108) {
                if (p108 && p108.link && p108.imageUrl) {
                  var v295 = p108.label ? "<span class=\"entry-label\">" + p108.label + "</span>" : "";
                  vLS11 += "<article class=\"index-post\" data-post-id=\"" + p108.id + "\"><a class=\"entry-image-wrap\" href=\"" + p108.link + "\" title=\"" + p108.title + "\"><span class=\"entry-image\" data-image=\"" + p108.imageUrl + "\"></span>" + v295 + "<div class=\"thumb-meta-overlay\"><span class=\"thumb-meta thumb-duration\"></span><span class=\"thumb-meta thumb-rating\"></span></div></a><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + p108.link + "\">" + p108.title + "</a></h2><div class=\"card-sub-meta\"><div class=\"sub-meta-left\"><span class=\"sub-meta-type\"></span><span class=\"sub-meta-year\"></span></div><div class=\"sub-meta-right\"><span class=\"sub-meta-cc\"></span><span class=\"sub-meta-mic\"></span></div></div></div></article>";
                }
              });
              var v296 = "<div class=\"index-post-wrap owl-carousel owl-theme\">" + vLS11 + "</div>";
              v$26.removeClass("is-loading").html(v296);
              f5();
              f29();
              v$26.find(".owl-carousel").owlCarousel({
                loop: !1,
                margin: 16,
                nav: !0,
                navText: ["<button type=\"button\" class=\"owl-prev\" aria-label=\"Previous Posts\"><svg viewBox=\"0 0 16 16\"><path d=\"M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z\"/></svg></button>", "<button type=\"button\" class=\"owl-next\" aria-label=\"Next Posts\"><svg viewBox=\"0 0 16 16\"><path d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></button>"],
                dots: !1,
                responsive: {
                  "0": {
                    items: 3,
                    margin: 8
                  },
                  "768": {
                    items: 4,
                    margin: 16
                  },
                  "1024": {
                    items: 6
                  }
                }
              });
            }).fail(function () {
              v$26.removeClass("is-loading").html("<p class=\"error-msg\">Error loading post details.</p>");
            });
          }).fail(function () {
            v$26.removeClass("is-loading").html("<p class=\"error-msg\">Could not load posts.</p>");
          });
        }
      }
      v$24.on("click", ".filter-btn", function () {
        var v$28 = $(this);
        if (!v$28.hasClass("active")) {
          var v297 = v$28.data("label");
          v$24.find(".filter-btn").removeClass("active");
          v$28.addClass("active");
          f23(v297);
        }
      });
      var v298 = v$24.find(".filter-btn.active").data("label");
      if (v298) {
        f23(v298);
      }
    }
    function f24() {
      var v$29 = $(".homepage-filter-buttons");
      if (v$29.length) {
        var v299 = v$29.find(".scroll-area");
        var v300 = v$29.find(".prev-btn");
        var v301 = v$29.find(".next-btn");
        const vO33 = {
          loop: !1,
          margin: 12,
          nav: !1,
          dots: !1,
          autoWidth: !0,
          slideBy: 1
        };
        v299.owlCarousel(vO33);
        v301.on("click", function () {
          v299.trigger("next.owl.carousel");
        });
        v300.on("click", function () {
          v299.trigger("prev.owl.carousel");
        });
      }
    }
    f24();
    function f25() {
      let v$30 = $(".homepage-filter-buttons");
      if (!v$30.length) {
        return;
      }
      let v302 = v$30.find(".scroll-area");
      let v303 = v$30.find(".prev-btn");
      let v304 = v$30.find(".next-btn");
      let v305 = v302[0];
      let vLN5 = 5;
      function f26() {
        setTimeout(function () {
          let v306 = v305.scrollLeft;
          let v307 = v305.scrollWidth;
          let v308 = v305.clientWidth;
          v303.css("visibility", v306 > vLN5 ? "visible" : "hidden");
          v304.css("visibility", v307 - v306 - v308 > vLN5 ? "visible" : "hidden");
        }, 150);
      }
      f26();
      v302.on("scroll", f26);
      $(window).on("resize", f26);
      v304.on("click", function () {
        v302.animate({
          scrollLeft: v305.scrollLeft + v305.clientWidth
        }, 300);
      });
      v303.on("click", function () {
        v302.animate({
          scrollLeft: v305.scrollLeft - v305.clientWidth
        }, 300);
      });
    }
    function f27() {
      var v$31 = $("#abefilm-load-more-link");
      if (v$31.length) {
        var v$32 = $("#blog-pager .loading");
        var v$33 = $("#blog-pager .no-more");
        var v$34 = $("#Blog1 .index-post-wrap");
        v$32.hide();
        v$33.hide();
        v$31.on("click", function (p109) {
          p109.preventDefault();
          var v309 = $(this).attr("data-load");
          if (!v309 || v309.trim() === "") {
            v$31.hide();
            v$33.css("display", "flex");
            return;
          }
          v$31.hide();
          v$32.show();
          $.ajax({
            url: v309,
            success: function (p110) {
              var v310 = $(p110).find("#Blog1 .index-post");
              var v311 = $(p110).find("#abefilm-load-more-link");
              if (v310.length > 0) {
                v$34.append(v310);
                f4("#Blog1");
                f5();
                f15();
                f29();
              }
              if (v311.length > 0 && v311.attr("data-load")) {
                v$31.attr("data-load", v311.attr("data-load"));
                v$31.css("display", "flex");
                v$33.hide();
              } else {
                v$31.hide();
                v$33.css("display", "flex");
              }
            },
            error: function () {
              v$31.css("display", "flex");
              v$33.hide();
            },
            complete: function () {
              v$32.hide();
            }
          });
        });
        if (!v$31.attr("data-load") || v$31.attr("data-load").trim() === "") {
          v$31.hide();
          v$33.css("display", "flex");
        } else {
          v$31.css("display", "flex");
          v$33.hide();
        }
      }
    }
    function f28(p111, p112) {
      if (p111.duration) {
        p112.find(".thumb-duration").html("\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" style=\"vertical-align: middle; margin-right: 4px;\">\n                <path d=\"M2 15C2.14277 15.4274 2.31023 15.8431 2.50062 16.2452M4.12547 18.7463C4.44158 19.1137 4.781 19.4596 5.14137 19.7814M9 22C8.55224 21.8557 8.11701 21.6824 7.69641 21.4822\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n                <path d=\"M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12M12 13.5C11.1716 13.5 10.5 12.8284 10.5 12M12 13.5V16M10.5 12H6\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" />\n                <path d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" />\n            </svg>\n        " + p111.duration).addClass("is-visible");
      }
      if (p111.rating) {
        p112.find(".thumb-rating").html("\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" style=\"vertical-align: middle; margin-right: 4px;\">\n                <path d=\"M9.03658 10.8665L10.0925 12.9957C10.2364 13.2921 10.6204 13.5764 10.9444 13.6309L12.8582 13.9515C14.082 14.1571 14.37 15.0524 13.4881 15.9355L12.0003 17.4356C11.7483 17.6897 11.6103 18.1796 11.6883 18.5305L12.1142 20.3875C12.4502 21.8574 11.6763 22.426 10.3864 21.6578L8.59263 20.5871C8.26867 20.3935 7.73473 20.3935 7.40476 20.5871L5.61096 21.6578C4.3271 22.426 3.54719 21.8513 3.88315 20.3875L4.3091 18.5305C4.3871 18.1796 4.24911 17.6897 3.99714 17.4356L2.5093 15.9355C1.6334 15.0524 1.91537 14.1571 3.13923 13.9515L5.05302 13.6309C5.37099 13.5764 5.75494 13.2921 5.89893 12.9957L6.95481 10.8665C7.53075 9.71116 8.46665 9.71116 9.03658 10.8665Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n                <path d=\"M22 2L14 10M16 2L11 7M20 10L17 13\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path>\n            </svg>\n        " + p111.rating).addClass("is-visible");
      }
      if (p111.audio) {
        p112.find(".sub-meta-mic").html("\n            <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" style=\"vertical-align: middle; margin-right: 4px;\">\n                <path d=\"M17 11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n                <path d=\"M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n                <path d=\"M14.3327 4.64612C15.5394 4.49594 16.4959 3.53944 16.6461 2.33267C16.6689 2.14999 16.8159 2 17 2C17.1841 2 17.3311 2.14999 17.3539 2.33267C17.5041 3.53944 18.4606 4.49594 19.6673 4.64612C19.85 4.66885 20 4.81591 20 5C20 5.1841 19.85 5.33115 19.6673 5.35388C18.4606 5.50406 17.5041 6.46056 17.3539 7.66733C17.3311 7.85001 17.1841 8 17 8C16.8159 8 16.6689 7.85001 16.6461 7.66733C16.4959 6.46056 15.5394 5.50406 14.3327 5.35388C14.15 5.33115 14 5.1841 14 5C14 4.81591 14.15 4.66885 14.3327 4.64612Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" />\n            </svg>\n         " + p111.audio).addClass("is-visible");
      }
      if (p111.type) {
        p112.find(".sub-meta-type").text(p111.type === "TV Series" ? "TV" : p111.type).addClass("is-visible");
      }
      if (p111.year) {
        p112.find(".sub-meta-year").text(p111.year).addClass("is-visible");
      }
      if (p111.subtitles) {
        p112.find(".sub-meta-cc").html("CC " + p111.subtitles).addClass("is-visible");
      }
    }
    function f29() {
      $(".index-post:not(.custom-meta-populated)").each(function () {
        var v$35 = $(this);
        var v312 = v$35.find("a.entry-image-wrap").attr("href");
        if (!v312) {
          v$35.addClass("custom-meta-populated");
          return;
        }
        var v313 = sessionStorage.getItem("meta_" + v312);
        if (v313) {
          f28(JSON.parse(v313), v$35);
          v$35.addClass("custom-meta-populated");
          return;
        }
        $.get(v312, function (p113) {
          var v$36 = $(p113);
          var v314 = v$36.find("#extra-meta");
          var vO34 = {
            year: v314.find(".meta-year").text().trim(),
            duration: v314.find(".meta-duration").text().trim(),
            subtitles: v314.find(".meta-subtitles").text().trim(),
            audio: v314.find(".meta-audio").text().trim(),
            type: v314.find(".meta-type").text().trim(),
            rating: v314.find(".meta-rating").text().trim()
          };
          sessionStorage.setItem("meta_" + v312, JSON.stringify(vO34));
          f28(vO34, v$35);
          v$35.addClass("custom-meta-populated");
        }).fail(function () {
          v$35.addClass("custom-meta-populated");
        });
      });
    }
    function f30() {
      if ($("body").find(".item-post").length) {
        var v$37 = $(".recommendation-posts-grid");
        if (v$37.length) {
          var v315 = $("#abefilm-related-posts .widget-content").text().trim();
          var v316 = v315.match(/\$results=\{([^}]+)\}/);
          var v317 = v316 ? parseInt(v316[1], 10) : 6;
          var v318 = v$37.data("label");
          var vString = String(v$37.data("postId"));
          if (!v318) {
            $(".recommendation-section").hide();
            return;
          }
          var v319 = "/feeds/posts/default/-/" + encodeURIComponent(v318) + "?alt=json-in-script&max-results=" + (v317 + 1);
          $.ajax({
            url: v319,
            type: "get",
            dataType: "jsonp",
            success: function (p114) {
              if (!p114.feed || !p114.feed.entry || p114.feed.entry.length < 1) {
                $(".recommendation-section").hide();
                return;
              }
              var v320 = p114.feed.entry.filter(p115 => p115.id.$t.split(".post-")[1] !== vString).slice(0, v317);
              if (v320.length === 0) {
                $(".recommendation-section").hide();
                return;
              }
              var v321 = v320.map(function (p116) {
                let v322 = p116.link.find(p117 => p117.rel === "alternate").href;
                let v323 = p116.title.$t;
                let v324 = p116.id.$t.split(".post-")[1];
                let v325 = document.createElement("div");
                v325.innerHTML = p116.content.$t;
                let v326 = (v325.querySelector("img[alt=\"poster\"]")?.src || "").replace(/\/s\d+(-[a-z0-9]+)*\//, "/s400-rw/");
                let v327 = p116.category && p116.category.length > 0 ? p116.category[0].term : "";
                let v328 = v327 ? "<span class=\"entry-label\">" + v327 + "</span>" : "";
                return "<article class=\"index-post" + ((p116.category ? p116.category.some(p118 => p118.term === "Mature") : !1) ? " is-mature" : "") + "\" data-post-id=\"" + v324 + "\">\n                   <a class=\"entry-image-wrap\" href=\"" + v322 + "\" title=\"" + v323 + "\">\n                       <span class=\"entry-image\" data-image=\"" + v326 + "\"></span>\n                       " + v328 + " \n                       <div class=\"thumb-meta-overlay\">\n                           <span class=\"thumb-meta thumb-duration\"></span>\n                           <span class=\"thumb-meta thumb-rating\"></span>\n                       </div>\n                   </a>\n                   <div class=\"entry-header\">\n                       <h2 class=\"entry-title\"><a href=\"" + v322 + "\">" + v323 + "</a></h2>\n                       <div class=\"card-sub-meta\">\n                           <div class=\"sub-meta-left\"><span class=\"sub-meta-type\"></span><span class=\"sub-meta-year\"></span></div>\n                           <div class=\"sub-meta-right\"><span class=\"sub-meta-cc\"></span><span class=\"sub-meta-mic\"></span></div>\n                       </div>\n                   </div>\n               </article>";
              }).join("");
              v$37.removeClass("is-loading").html(v321);
              f5();
              f29();
              applySafeMode();
            },
            error: function () {
              $(".recommendation-section").hide();
            }
          });
        }
      }
    }
    (function () {
      let v$38 = $("#HTML90");
      if (!v$38.length) {
        return;
      }
      let vA7 = ["Action", "Action & Adventure", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Kids", "Music", "Mystery", "Reality", "Romance", "Sci-Fi & Fantasy", "Science Fiction", "Thriller", "War", "Western"];
      let v329 = v$38.find("#random-posts-grid");
      let v330 = v$38.find("#random-posts-switch");
      let vA8 = [];
      function f31(p119) {
        for (let v331 = p119.length - 1; v331 > 0; v331--) {
          let v332 = Math.floor(Math.random() * (v331 + 1));
          [p119[v331], p119[v332]] = [p119[v332], p119[v331]];
        }
      }
      function f32() {
        if (vA8.length < 6) {
          v329.html("<p style='width:100%;text-align:center;font-size:14px;'>Not enough posts to display.</p>");
          v330.hide();
          return;
        }
        f31(vA8);
        let v333 = vA8.slice(0, 6).map(p120 => "\n            <article class=\"index-post\" data-post-id=\"" + p120.id + "\">\n              <a class=\"entry-image-wrap\" href=\"" + p120.url + "\" title=\"" + p120.title + "\">\n                <span class=\"entry-image\" data-image=\"" + p120.imageUrl + "\"></span>\n                <span class=\"entry-label\">" + p120.label + "</span>\n                <div class=\"thumb-meta-overlay\">\n                  <span class=\"thumb-meta thumb-duration\">\n                    " + (p120.duration ? "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" style=\"vertical-align: middle; margin-right: 4px;\"><path d=\"M2 15C2.14277 15.4274 2.31023 15.8431 2.50062 16.2452M4.12547 18.7463C4.44158 19.1137 4.781 19.4596 5.14137 19.7814M9 22C8.55224 21.8557 8.11701 21.6824 7.69641 21.4822\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" /><path d=\"M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12M12 13.5C11.1716 13.5 10.5 12.8284 10.5 12M12 13.5V16M10.5 12H6\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" /><path d=\"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" /></svg>" + p120.duration : "") + "\n                  </span>\n                  <span class=\"thumb-meta thumb-rating\">\n                    " + (p120.rating ? "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"11\" height=\"11\" fill=\"none\"><path d=\"M9.03658 10.8665L10.0925 12.9957C10.2364 13.2921 10.6204 13.5764 10.9444 13.6309L12.8582 13.9515C14.082 14.1571 14.37 15.0524 13.4881 15.9355L12.0003 17.4356C11.7483 17.6897 11.6103 18.1796 11.6883 18.5305L12.1142 20.3875C12.4502 21.8574 11.6763 22.426 10.3864 21.6578L8.59263 20.5871C8.26867 20.3935 7.73473 20.3935 7.40476 20.5871L5.61096 21.6578C4.3271 22.426 3.54719 21.8513 3.88315 20.3875L4.3091 18.5305C4.3871 18.1796 4.24911 17.6897 3.99714 17.4356L2.5093 15.9355C1.6334 15.0524 1.91537 14.1571 3.13923 13.9515L5.05302 13.6309C5.37099 13.5764 5.75494 13.2921 5.89893 12.9957L6.95481 10.8665C7.53075 9.71116 8.46665 9.71116 9.03658 10.8665Z\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M22 2L14 10M16 2L11 7M20 10L17 13\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"></path></svg>" + p120.rating : "") + "\n                  </span>\n                </div>\n              </a>\n              <div class=\"entry-header\">\n                <h2 class=\"entry-title\"><a href=\"" + p120.url + "\">" + p120.title + "</a></h2>\n                <div class=\"card-sub-meta\">\n                  <div class=\"sub-meta-left\">\n                    <span class=\"sub-meta-type\">" + (p120.type ? p120.type === "TV Series" ? "TV" : p120.type : "") + "</span>\n                    <span class=\"sub-meta-year\">" + (p120.year || "") + "</span>\n                  </div>\n                  <div class=\"sub-meta-right\">\n                    <span class=\"sub-meta-cc\">" + (p120.subtitles ? "CC " + p120.subtitles : "") + "</span>\n                    <span class=\"sub-meta-mic\">\n                      " + (p120.audio ? "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"10\" height=\"10\"><path d=\"M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z\" fill=\"currentColor\"/></svg>" + p120.audio : "") + "\n                    </span>\n                  </div>\n                </div>\n              </div>\n            </article>\n        ").join("");
        v329.html(v333);
        f5();
        f29();
      }
      function f33() {
        $.ajax({
          url: "/feeds/posts/default?alt=json-in-script&max-results=50",
          type: "get",
          dataType: "jsonp",
          success: function (p121) {
            if (!p121.feed || !p121.feed.entry) {
              v329.html("<p>Failed to load posts.</p>");
              return;
            }
            vA8 = p121.feed.entry.map(function (p122) {
              let v334 = document.createElement("div");
              v334.innerHTML = p122.content.$t;
              let v$39 = $(v334);
              let v335 = v$39.find("#extra-meta");
              let v336 = (p122.category || []).map(p123 => p123.term).find(p124 => vA7.includes(p124)) || "";
              return {
                id: p122.id.$t.split(".post-")[1],
                title: p122.title.$t,
                url: p122.link.find(p125 => p125.rel === "alternate").href,
                imageUrl: (v$39.find("img[alt=\"poster\"]").attr("src") || "x").replace(/\/s\d+(-[a-z0-9]+)*\//, "/w400-h600-c/"),
                label: v336,
                rating: v335.find(".meta-rating").text().trim(),
                year: v335.find(".meta-year").text().trim(),
                duration: v335.find(".meta-duration").text().trim(),
                subtitles: v335.find(".meta-subtitles").text().trim(),
                audio: v335.find(".meta-audio").text().trim(),
                type: v335.find(".meta-type").text().trim()
              };
            }).filter(Boolean);
            f32();
            v330.show();
          },
          error: function () {
            v329.html("<p>Failed to load post feed.</p>");
          }
        });
      }
      let v337 = $(".sidebar-logo .logo-text").text().trim() || "ABEFILM";
      let vLS12 = "";
      for (let vLN012 = 0; vLN012 < 6; vLN012++) {
        vLS12 += "<div class=\"skeleton-post-item\"><div class=\"skeleton-image-placeholder\"><span class=\"skeleton-card-text\">" + v337 + "</span></div><div class=\"skeleton-title-placeholder\"></div></div>";
      }
      v329.html(vLS12);
      v330.hide();
      new IntersectionObserver((p126, p127) => {
        p126.forEach(p128 => {
          if (p128.isIntersecting) {
            f33();
            p127.unobserve(p128.target);
          }
        });
      }, {
        rootMargin: "0px 0px 200px 0px"
      }).observe(v$38[0]);
      v330.on("click", f32);
    })();
    (function () {
      let vLSAbefilmUserWatchlist = "abefilmUserWatchlist";
      let v$40 = $("#clear-watchlist-modal-overlay");
      let vLSsvgWidth60pxHeight602 = "<svg width=\"60px\" height=\"60px\" viewBox=\"0 0 60 60\"><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#FFFFFF\" cx=\"30\" cy=\"30\" r=\"30\"></circle><path d=\"M29.3055556,17.25 C29.6890866,17.25 30,17.5609134 30,17.9444444 L30,19.3888889 C30,19.77242 29.6890866,20.0833333 29.3055556,20.0833333 L22.9166667,20.0833333 L22.9166667,39.724 L28.6396082,34.9562398 C29.3713667,34.346441 30.4106369,34.302884 31.1863257,34.8255686 L31.3603918,34.9562398 L37.0833333,39.7254167 L37.0833333,33.5277778 C37.0833333,33.1442467 37.3942467,32.8333333 37.7777778,32.8333333 L39.2222222,32.8333333 C39.6057533,32.8333333 39.9166667,33.1442467 39.9166667,33.5277778 L39.9166667,41.2376789 C39.9166667,42.4112764 38.9652794,43.3627321 37.7916667,43.3627321 C37.3655561,43.3627321 36.9510168,43.2346313 36.6007867,42.9976358 L36.4312748,42.8701491 L30,37.50975 L23.5687252,42.8701491 C22.7234861,43.574515 21.4929682,43.5114751 20.7233835,42.7579578 L20.5758631,42.5980707 C20.3030814,42.2707327 20.1360669,41.8703014 20.0939154,41.4495208 L20.0833333,41.2376789 L20.0833333,20.0833333 C20.0833333,18.5896541 21.2391602,17.3659327 22.7052117,17.2577715 L22.9166667,17.25 L29.3055556,17.25 Z M39.2222222,17.25 C39.6057533,17.25 39.9166667,17.5609134 39.9166667,17.9444444 L39.9163333,21.499 L43.4722222,21.5 C43.8557533,21.5 44.1666667,21.8109134 44.1666667,22.1944444 L44.1666667,23.6388889 C44.1666667,24.02242 43.8557533,24.3333333 43.4722222,24.3333333 L39.9163333,24.333 L39.9166667,27.8888889 C39.9166667,28.27242 39.6057533,28.5833333 39.2222222,28.5833333 L37.7777778,28.5833333 C37.3942467,28.5833333 37.0833333,28.27242 37.0833333,27.8888889 L37.0823333,24.333 L33.5277778,24.3333333 C33.1442467,24.3333333 32.8333333,24.02242 32.8333333,23.6388889 L32.8333333,22.1944444 C32.8333333,21.8109134 33.1442467,21.5 33.5277778,21.5 L37.0823333,21.499 L37.0833333,17.9444444 C37.0833333,17.5609134 37.3942467,17.25 37.7777778,17.25 L39.2222222,17.25 Z\" fill=\"#111319\" fill-rule=\"nonzero\"></path></g></svg>";
      let vLSsvgViewBox006060circ2 = "<svg viewBox=\"0 0 60 60\"><circle fill=\"#fff\" cx=\"30\" cy=\"30\" r=\"30\"></circle><path d=\"M29.3,17.25C29.7,17.25,30,17.56,30,17.94V19.38C30,19.77,29.7,20.08,29.3,20.08H22.91V39.72L28.64,34.95C29.37,34.34,30.41,34.3,31.18,34.82L37.08,39.72V33.52C37.08,33.14,37.39,32.83,37.77,32.83H39.22C39.6,32.83,39.91,33.14,39.91,33.52V41.23C39.91,42.41,38.96,43.36,37.79,43.36C37.36,43.36,36.95,43.23,36.6,42.99L30,37.5L23.56,42.87C22.72,43.57,21.49,43.51,20.72,42.75C20.3,42.27,20.13,41.87,20.08,41.23V20.08C20.08,18.58,21.23,17.36,22.7,17.25H29.3Z\" fill=\"#111319\" fill-rule=\"nonzero\"></path><path d=\"M33 23L37 27L44 18\" stroke=\"#111319\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>";
      let vLSsvgWidth60pxHeight603 = "<svg width=\"60px\" height=\"60px\" viewBox=\"0 0 60 60\"><g stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"#FFFFFF\" cx=\"30\" cy=\"30\" r=\"30\"></circle><path d=\"M29.3055556,17.25 C29.6890866,17.25 30,17.5609134 30,17.9444444 L30,19.3888889 C30,19.77242 29.6890866,20.0833333 29.3055556,20.0833333 L22.9166667,20.0833333 L22.9166667,39.724 L28.6396082,34.9562398 C29.3713667,34.346441 30.4106369,34.302884 31.1863257,34.8255686 L31.3603918,34.9562398 L37.0833333,39.7254167 L37.0833333,33.5277778 C37.0833333,33.1442467 37.3942467,32.8333333 37.7777778,32.8333333 L39.2222222,32.8333333 C39.6057533,32.8333333 39.9166667,33.1442467 39.9166667,33.5277778 L39.9166667,41.2376789 C39.9166667,42.4112764 38.9652794,43.3627321 37.7916667,43.3627321 C37.3655561,43.3627321 36.9510168,43.2346313 36.6007867,42.9976358 L36.4312748,42.8701491 L30,37.50975 L23.5687252,42.8701491 C22.7234861,43.574515 21.4929682,43.5114751 20.7233835,42.7579578 L20.5758631,42.5980707 C20.3030814,42.2707327 20.1360669,41.8703014 20.0939154,41.4495208 L20.0833333,41.2376789 L20.0833333,20.0833333 C20.0833333,18.5896541 21.2391602,17.3659327 22.7052117,17.2577715 L22.9166667,17.25 L29.3055556,17.25 Z M39.2222222,17.25 C39.6057533,17.25 39.9166667,17.5609134 39.9166667,17.9444444 L39.9163333,21.499 L43.4722222,21.5 C43.8557533,21.5 44.1666667,21.8109134 44.1666667,22.1944444 L44.1666667,23.6388889 C44.1666667,24.02242 43.8557533,24.3333333 43.4722222,24.3333333 L39.9163333,24.333 L39.9166667,27.8888889 C39.9166667,28.27242 39.6057533,28.5833333 39.2222222,28.5833333 L37.7777778,28.5833333 C37.3942467,28.5833333 37.0833333,28.27242 37.0833333,27.8888889 L37.0823333,24.333 L33.5277778,24.3333333 C33.1442467,24.3333333 32.8333333,24.02242 32.8333333,23.6388889 L32.8333333,22.1944444 C32.8333333,21.8109134 33.1442467,21.5 33.5277778,21.5 L37.0823333,21.499 L37.0833333,17.9444444 C37.0833333,17.5609134 37.3942467,17.25 37.7777778,17.25 L39.2222222,17.25 Z\" fill=\"#111319\" fill-rule=\"nonzero\"></path></g></svg>";
      let vLSsvgViewBox006060circ3 = "<svg viewBox=\"0 0 60 60\"><circle fill=\"#fff\" cx=\"30\" cy=\"30\" r=\"30\"></circle><path d=\"M29.3,17.25C29.7,17.25,30,17.56,30,17.94V19.38C30,19.77,29.7,20.08,29.3,20.08H22.91V39.72L28.64,34.95C29.37,34.34,30.41,34.3,31.18,34.82L37.08,39.72V33.52C37.08,33.14,37.39,32.83,37.77,32.83H39.22C39.6,32.83,39.91,33.14,39.91,33.52V41.23C39.91,42.41,38.96,43.36,37.79,43.36C37.36,43.36,36.95,43.23,36.6,42.99L30,37.5L23.56,42.87C22.72,43.57,21.49,43.51,20.72,42.75C20.3,42.27,20.13,41.87,20.08,41.23V20.08C20.08,18.58,21.23,17.36,22.7,17.25H29.3Z\" fill=\"#111319\" fill-rule=\"nonzero\"></path><path d=\"M33 23L37 27L44 18\" stroke=\"#111319\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>";
      let vLSsvgViewBox002424path = "<svg viewBox=\"0 0 24 24\"><path d=\"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z\"></path></svg>";
      let vLSsvgViewBox002424path2 = "<svg viewBox=\"0 0 24 24\"><path d=\"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z\"></path></svg>";
      window.getWatchlist = () => {
        try {
          let v338 = localStorage.getItem(vLSAbefilmUserWatchlist);
          if (v338) {
            return JSON.parse(v338);
          } else {
            return [];
          }
        } catch {
          return [];
        }
      };
      window.saveWatchlist = p129 => {
        localStorage.setItem(vLSAbefilmUserWatchlist, JSON.stringify(p129));
      };
      window.addToWatchlist = p130 => {
        let vGetWatchlist = getWatchlist();
        if (!vGetWatchlist.some(p131 => p131.id === p130.id)) {
          vGetWatchlist.unshift(p130);
          saveWatchlist(vGetWatchlist);
        }
      };
      window.removeFromWatchlist = p132 => {
        let v339 = getWatchlist().filter(p133 => String(p133.id) !== String(p132));
        saveWatchlist(v339);
      };
      window.isItemInWatchlist = p134 => p134 ? getWatchlist().some(p135 => String(p135.id) === String(p134)) : !1;
      window.updateWatchlistBadge = () => {
        let v340 = getWatchlist().length;
        let v$41 = $(".watchlist-badge");
        if (v340 > 0) {
          v$41.text(v340).show();
        } else {
          v$41.text("0").hide();
        }
      };
      window.renderWatchlistPanel = async () => {
        let vGetWatchlist2 = getWatchlist();
        let v$42 = $("#watchlist-items-list");
        let v$43 = $("#watchlist-empty-message");
        let v341 = vGetWatchlist2.length;
        let v342 = vGetWatchlist2.slice(0, 4);
        v$42.empty();
        $(".view-all-watchlist-link").remove();
        if (v342.length === 0) {
          v$43.show();
          updateWatchlistBadge();
          return;
        }
        v$43.hide();
        v$42.html("<li>Loading...</li>");
        let v343 = await Promise.all(v342.map(async p136 => {
          try {
            let v344 = await fetch(p136.url);
            if (!v344.ok) {
              return p136;
            }
            let v345 = await v344.text();
            let v346 = document.createElement("div");
            v346.innerHTML = v345;
            let v347 = v346.querySelector("span.slider-backdrop");
            let v348 = p136.image;
            if (v347 && v347.textContent.trim()) {
              v348 = v347.textContent.trim();
            }
            return {
              ...p136,
              image: v348
            };
          } catch (e8) {
            console.warn("Failed to fetch details for " + p136.title + ":", e8);
            return p136;
          }
        }));
        v$42.empty();
        v343.forEach(p137 => {
          let v349 = "<li><a href=\"" + p137.url + "\" title=\"" + p137.title + "\"><img class=\"watchlist-item-image\" src=\"" + p137.image + "\" alt=\"" + p137.title + "\" loading=\"lazy\" width=\"90\" height=\"50\"/></a><a href=\"" + p137.url + "\" class=\"watchlist-item-title\" title=\"" + p137.title + "\">" + p137.title + "</a><button class=\"watchlist-delete-btn\" data-id=\"" + p137.id + "\" title=\"Remove\"><svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\"><path d=\"M19.5 5.5L19.0982 12.0062M4.5 5.5L5.10461 15.5248C5.25945 18.0922 5.33688 19.3759 5.97868 20.299C6.296 20.7554 6.7048 21.1407 7.17905 21.4302C7.85035 21.84 8.68108 21.9631 10 22\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><path d=\"M20 15L13 21.9995M20 22L13 15.0005\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><path d=\"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg></button></li>";
          v$42.append(v349);
        });
        if (v341 > 4) {
          v$42.after("<a class=\"view-all-watchlist-link\" href=\"/p/watchlist.html\">See All <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" fill=\"currentColor\" viewBox=\"0 0 16 16\" style=\"vertical-align: middle;\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a>");
        }
        updateWatchlistBadge();
      };
      window.updateButtonState = p138 => {
        if (!p138 || !p138.length) {
          return;
        }
        let v350 = p138.attr("data-post-id");
        let vIsItemInWatchlist = isItemInWatchlist(v350);
        let v351 = p138.hasClass("post-page-add-btn");
        let v352 = p138.closest("#preview-popup").length > 0;
        let v353 = p138.hasClass("slider-btn");
        if (v351) {
          let v354 = vIsItemInWatchlist ? "Added" : "Add to List";
          let v355 = vIsItemInWatchlist ? vLSsvgViewBox002424path2 : vLSsvgViewBox002424path;
          p138.html(v355 + "<span>" + v354 + "</span>");
        } else if (v352) {
          p138.html(vIsItemInWatchlist ? vLSsvgViewBox006060circ3 : vLSsvgWidth60pxHeight603);
        } else if (v353) {
          p138.html(vIsItemInWatchlist ? vLSsvgViewBox006060circ2 : vLSsvgWidth60pxHeight602);
        }
        p138.toggleClass("added", vIsItemInWatchlist);
      };
      window.initializeAllButtonStates = () => {
        $(".add-list-btn, .slider-btn.add-btn, #preview-popup .watchlist-btn").each(function () {
          updateButtonState($(this));
        });
      };
      $(document).on("click", ".add-list-btn, .slider-btn.add-btn, #preview-popup .watchlist-btn", function (p139) {
        p139.preventDefault();
        let v$44 = $(this);
        let vO36 = {
          id: v$44.attr("data-post-id"),
          title: v$44.attr("data-post-title"),
          url: v$44.attr("data-post-url"),
          image: v$44.attr("data-post-image")
        };
        if (!!vO36.id && !!vO36.title) {
          if (isItemInWatchlist(vO36.id)) {
            removeFromWatchlist(vO36.id);
          } else {
            addToWatchlist(vO36);
          }
          $("[data-post-id=\"" + vO36.id + "\"]").each(function () {
            updateButtonState($(this));
          });
          updateWatchlistBadge();
        }
      });
      $("#watchlist-items-list").on("click", ".watchlist-delete-btn", function (p140) {
        p140.stopPropagation();
        removeFromWatchlist($(this).data("id"));
        renderWatchlistPanel();
        initializeAllButtonStates();
      });
      $("#clear-watchlist-btn").on("click", function (p141) {
        p141.preventDefault();
        p141.stopPropagation();
        if (getWatchlist().length > 0) {
          v$40.addClass("is-visible");
        }
      });
      $("#confirm-clear-btn").on("click", function () {
        saveWatchlist([]);
        renderWatchlistPanel();
        initializeAllButtonStates();
        v$40.removeClass("is-visible");
      });
      $("#cancel-clear-btn, #clear-watchlist-modal-overlay").on("click", function (p142) {
        if (p142.target === this) {
          v$40.removeClass("is-visible");
        }
      });
      $(document).on("abefilm:preview_shown", function (p143, p144) {
        updateButtonState(p144.$button);
      });
      initializeAllButtonStates();
    })();
    (function () {
      let v$45 = $("#clear-watchlist-modal-overlay");
      window.updateHistoryBadge = () => {
        let v356 = JSON.parse(localStorage.getItem("watchHistoryIDs") || "[]").length;
        let v$46 = $(".history-badge");
        if (v356 > 0) {
          v$46.text(v356).css("display", "flex");
        } else {
          v$46.hide();
        }
      };
      window.displayHistory = async () => {
        let v$47 = $("#history-items-list");
        let v$48 = $("#history-empty-message");
        if (!v$47.length) {
          return;
        }
        let v357 = JSON.parse(localStorage.getItem("watchHistoryIDs") || "[]");
        let v358 = v357.length;
        let v359 = v357.slice(0, 4);
        let v360 = JSON.parse(localStorage.getItem("abefilmWatchProgress") || "{}");
        if (v359.length === 0) {
          v$47.empty();
          v$48.show();
          $(".view-all-history-link").remove();
          return;
        }
        v$48.hide();
        v$47.html("<li>Loading...</li>");
        let v361 = window.location.origin;
        let vO37 = {};
        let v362 = v359.map(p145 => fetch(v361 + "/feeds/posts/default/" + p145 + "?alt=json").then(p146 => p146.ok ? p146.json() : null).then(p147 => {
          if (p147 && p147.entry) {
            let v363 = p147.entry;
            let v364 = document.createElement("div");
            v364.innerHTML = v363.content.$t;
            let v365 = v364.querySelector("span.slider-backdrop");
            let v366 = v364.querySelector("img[alt=\"poster\"]");
            let v367 = v365 && v365.textContent.trim() || v366 && v366.src || "x";
            let v368 = v364.querySelector("#episodes-data ul[data-server-name]");
            vO37[p145] = {
              title: v363.title.$t,
              link: v363.link.find(p148 => p148.rel === "alternate").href,
              thumb: v367,
              totalEpisodes: v368 ? v368.querySelectorAll("a").length : 0
            };
          }
        }).catch(p149 => console.warn("Failed to fetch post " + p145, p149)));
        await Promise.all(v362);
        let vLS13 = "";
        v359.forEach(p150 => {
          let v369 = vO37[p150];
          if (v369) {
            let vLS14 = "";
            if (v369.totalEpisodes > 0) {
              let v370 = v360["post-" + p150] || 0;
              let v371 = v370 + 1;
              vLS14 = "<div class=\"history-item-progress-info\"><span class=\"ep-current\">EP " + v371 + "</span><span class=\"ep-count\"><span class=\"current\">" + v371 + "</span> / " + v369.totalEpisodes + "</span></div><div class=\"progress-bar-container\"><div class=\"progress-bar-fill\" style=\"width: " + v371 / v369.totalEpisodes * 100 + "%;\"></div></div>";
            }
            vLS13 += "<li id=\"history-item-" + p150 + "\"><a href=\"" + v369.link + "\" title=\"" + v369.title + "\"><img class=\"watchlist-item-image\" src=\"" + v369.thumb + "\" alt=\"" + v369.title + "\" loading=\"lazy\"/></a><div class=\"history-item-details\"><a href=\"" + v369.link + "\" class=\"watchlist-item-title\" title=\"" + v369.title + "\">" + v369.title + "</a>" + vLS14 + "</div><button class=\"watchlist-delete-btn\" data-id=\"" + p150 + "\"><svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\"><path d=\"M19.5 5.5L19.0982 12.0062M4.5 5.5L5.10461 15.5248C5.25945 18.0922 5.33688 19.3759 5.97868 20.299C6.296 20.7554 6.7048 21.1407 7.17905 21.4302C7.85035 21.84 8.68108 21.9631 10 22\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><path d=\"M20 15L13 21.9995M20 22L13 15.0005\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/><path d=\"M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/></svg></button></li>";
          }
        });
        v$47.html(vLS13 || "");
        if (!v$47.html().trim()) {
          v$48.show();
        }
        $(".view-all-history-link").remove();
        if (v358 > 4) {
          v$47.after("<a class=\"view-all-history-link\" href=\"/p/history.html\">See All <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" fill=\"currentColor\" viewBox=\"0 0 16 16\" style=\"vertical-align: middle;\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a>");
        }
      };
      function f34(p151, p152, p153) {
        v$45.find("h3").text(p151);
        v$45.find("p").text(p152);
        $("#confirm-clear-btn").off("click").on("click", () => {
          p153();
          v$45.removeClass("is-visible");
        });
        v$45.addClass("is-visible");
      }
      $("#history-items-list").on("click", ".watchlist-delete-btn", function (p154) {
        p154.stopPropagation();
        window.removeFromHistory($(this).data("id"));
      });
      $("#clear-history-btn").on("click", function (p155) {
        p155.preventDefault();
        p155.stopPropagation();
        if (JSON.parse(localStorage.getItem("watchHistoryIDs") || "[]").length > 0) {
          f34("Clear History", "Are you sure you want to clear your viewing history?", () => {
            localStorage.setItem("watchHistoryIDs", "[]");
            displayHistory();
            updateHistoryBadge();
          });
        }
      });
    })();
    (function () {
      function f35() {
        let v$49 = $(".language-btn");
        let v$50 = $("#langMenu");
        if (!v$49.length || !v$50.length) {
          return;
        }
        let vA9 = [{
          code: "af",
          name: "Afrikaans",
          country: "za"
        }, {
          code: "sq",
          name: "Albanian",
          country: "al"
        }, {
          code: "ar",
          name: "Arabic",
          country: "sa"
        }, {
          code: "hy",
          name: "Armenian",
          country: "am"
        }, {
          code: "az",
          name: "Azerbaijani",
          country: "az"
        }, {
          code: "eu",
          name: "Basque",
          country: "es"
        }, {
          code: "be",
          name: "Belarusian",
          country: "by"
        }, {
          code: "bn",
          name: "Bengali",
          country: "bd"
        }, {
          code: "bs",
          name: "Bosnian",
          country: "ba"
        }, {
          code: "bg",
          name: "Bulgarian",
          country: "bg"
        }, {
          code: "ca",
          name: "Catalan",
          country: "es"
        }, {
          code: "zh-CN",
          name: "Chinese (Simplified)",
          country: "cn"
        }, {
          code: "zh-TW",
          name: "Chinese (Traditional)",
          country: "tw"
        }, {
          code: "hr",
          name: "Croatian",
          country: "hr"
        }, {
          code: "cs",
          name: "Czech",
          country: "cz"
        }, {
          code: "da",
          name: "Danish",
          country: "dk"
        }, {
          code: "nl",
          name: "Dutch",
          country: "nl"
        }, {
          code: "en",
          name: "English",
          country: "us"
        }, {
          code: "et",
          name: "Estonian",
          country: "ee"
        }, {
          code: "tl",
          name: "Filipino",
          country: "ph"
        }, {
          code: "fi",
          name: "Finnish",
          country: "fi"
        }, {
          code: "fr",
          name: "French",
          country: "fr"
        }, {
          code: "gl",
          name: "Galician",
          country: "es"
        }, {
          code: "ka",
          name: "Georgian",
          country: "ge"
        }, {
          code: "de",
          name: "German",
          country: "de"
        }, {
          code: "el",
          name: "Greek",
          country: "gr"
        }, {
          code: "gu",
          name: "Gujarati",
          country: "in"
        }, {
          code: "ht",
          name: "Haitian Creole",
          country: "ht"
        }, {
          code: "iw",
          name: "Hebrew",
          country: "il"
        }, {
          code: "hi",
          name: "Hindi",
          country: "in"
        }, {
          code: "hu",
          name: "Hungarian",
          country: "hu"
        }, {
          code: "is",
          name: "Icelandic",
          country: "is"
        }, {
          code: "id",
          name: "Indonesian",
          country: "id"
        }, {
          code: "ga",
          name: "Irish",
          country: "ie"
        }, {
          code: "it",
          name: "Italian",
          country: "it"
        }, {
          code: "ja",
          name: "Japanese",
          country: "jp"
        }, {
          code: "kn",
          name: "Kannada",
          country: "in"
        }, {
          code: "ko",
          name: "Korean",
          country: "kr"
        }, {
          code: "la",
          name: "Latin",
          country: "va"
        }, {
          code: "lv",
          name: "Latvian",
          country: "lv"
        }, {
          code: "lt",
          name: "Lithuanian",
          country: "lt"
        }, {
          code: "mk",
          name: "Macedonian",
          country: "mk"
        }, {
          code: "ms",
          name: "Malay",
          country: "my"
        }, {
          code: "mt",
          name: "Maltese",
          country: "mt"
        }, {
          code: "no",
          name: "Norwegian",
          country: "no"
        }, {
          code: "fa",
          name: "Persian",
          country: "ir"
        }, {
          code: "pl",
          name: "Polish",
          country: "pl"
        }, {
          code: "pt",
          name: "Portuguese",
          country: "pt"
        }, {
          code: "ro",
          name: "Romanian",
          country: "ro"
        }, {
          code: "ru",
          name: "Russian",
          country: "ru"
        }, {
          code: "sr",
          name: "Serbian",
          country: "rs"
        }, {
          code: "sk",
          name: "Slovak",
          country: "sk"
        }, {
          code: "sl",
          name: "Slovenian",
          country: "si"
        }, {
          code: "es",
          name: "Spanish",
          country: "es"
        }, {
          code: "sw",
          name: "Swahili",
          country: "ke"
        }, {
          code: "sv",
          name: "Swedish",
          country: "se"
        }, {
          code: "ta",
          name: "Tamil",
          country: "in"
        }, {
          code: "te",
          name: "Telugu",
          country: "in"
        }, {
          code: "th",
          name: "Thai",
          country: "th"
        }, {
          code: "tr",
          name: "Turkish",
          country: "tr"
        }, {
          code: "uk",
          name: "Ukrainian",
          country: "ua"
        }, {
          code: "ur",
          name: "Urdu",
          country: "pk"
        }, {
          code: "vi",
          name: "Vietnamese",
          country: "vn"
        }, {
          code: "cy",
          name: "Welsh",
          country: "gb"
        }, {
          code: "yi",
          name: "Yiddish",
          country: "il"
        }];
        function f36() {
          let v$51 = $("#langList");
          if (!(v$51.children().length > 0)) {
            vA9.forEach(p156 => {
              let v$52 = $("<li><a href=\"#\"><img class=\"flag-icon\"/><span></span></a></li>");
              v$52.find("span").text(p156.name);
              v$52.find("a").on("click", function (p157) {
                p157.preventDefault();
                var v$53 = $("select.goog-te-combo");
                if (v$53.length) {
                  v$53.val(p156.code);
                  var v372;
                  if (document.createEvent) {
                    v372 = document.createEvent("HTMLEvents");
                    v372.initEvent("change", true, true);
                    v$53[0].dispatchEvent(v372);
                  } else {
                    v372 = document.createEventObject();
                    v372.eventType = "change";
                    v$53[0].fireEvent("on" + v372.eventType, v372);
                  }
                }
                v$50.removeClass("lang-menu-visible");
              });
              v$51.append(v$52);
            });
          }
        }
        v$49.on("click", function (p158) {
          p158.preventDefault();
          p158.stopPropagation();
          f36();
          v$50.toggleClass("lang-menu-visible");
        });
        $("#langSearch").on("input", function () {
          let v373 = $(this).val().toLowerCase();
          $("#langList li").each(function () {
            $(this).css("display", $(this).text().toLowerCase().includes(v373) ? "" : "none");
          });
        });
        $(document).on("click", function (p159) {
          if (!$(p159.target).closest(".language-btn, .language-dropdown-menu").length) {
            v$50.removeClass("lang-menu-visible");
          }
        });
      }
      function f37() {
        if ($("select.goog-te-combo").length > 0) {
          f35();
        } else {
          setTimeout(f37, 150);
        }
      }
      f37();
      let vSetInterval = setInterval(function () {
        let v374 = document.querySelector(".goog-te-gadget-icon");
        if (v374) {
          v374.style.display = "none";
          v374.style.visibility = "hidden";
          let v375 = v374.parentElement;
          if (v375 && v375.classList.contains("skiptranslate")) {
            v375.style.display = "none";
            v375.style.visibility = "hidden";
          }
          clearInterval(vSetInterval);
        }
      }, 200);
      function f38() {
        let v$54 = $(".notification-badge, .mobile-notification-badge");
        let v376 = $("#header-notifications .noti-item").length;
        if (v376 > 0) {
          v$54.text(v376).show();
        } else {
          v$54.hide();
        }
      }
      f38();
      var v$55 = $(".head-container, .mobile-header-container");
      function f39() {
        v$55.toggleClass("scrolled", $(window).scrollTop() > 50);
      }
      f39();
      $(window).on("scroll", f39);
      if (window.innerWidth > 1023) {
        let vF25 = function (p160) {
          if (!p160.hasClass("continue-watching-item")) {
            var v377 = p160.find("a").attr("href");
            if (v377) {
              if (v395) {
                v395.abort();
              }
              var v378 = new URL(v377).pathname;
              var v379 = p160[0].getBoundingClientRect();
              var v380 = window.scrollX + v379.left + v379.width / 2 - v$57.width() / 2;
              var v381 = window.scrollY + v379.top + v379.height / 2 - v$57.height() / 2;
              if (v380 < 10) {
                v380 = 10;
              }
              if (v380 + v$57.width() > $(window).width() - 10) {
                v380 = $(window).width() - v$57.width() - 10;
              }
              v$57.addClass("loading").css({
                top: v381 + "px",
                left: v380 + "px",
                display: "block"
              }).addClass("visible");
              v$57.off("click.cardnav");
              v$57.on("click.cardnav", function (p161) {
                if ($(p161.target).closest(".action-buttons, .more-info-link").length > 0) {
                  return;
                }
                let v382 = $("#preview-more-link").attr("href");
                if (v382 && v382 !== "#") {
                  window.location.href = v382;
                }
              });
              if (v$57.data("current-url") !== v377) {
                $("#preview-title, #preview-synopsis, #preview-rating, #preview-year, #preview-genres").empty();
                $("#preview-image").css("background-image", "");
                v395 = $.get(v377, function (p162) {
                  if (!!v394 && !!v394.is(p160)) {
                    var v383 = $("<div/>").html(p162);
                    var v384 = v383.find("#extra-meta");
                    var v385 = v383.find("span.slider-backdrop").text().trim();
                    var v386 = v383.find("img[alt=\"poster\"]").attr("src");
                    var v387 = v383.find(".entry-title").text().trim();
                    var v388 = v383.find(".post-body p").first().text().trim();
                    var v389 = v384.find(".meta-rating").text().trim();
                    var v390 = v384.find(".meta-year").text().trim();
                    var v391 = v384.find(".meta-genre").map(function () {
                      return $(this).text().trim();
                    }).get();
                    var v$56 = $("#preview-popup .watchlist-btn");
                    if (v389) {
                      $("#preview-rating").html("\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" fill=\"currentColor\" viewBox=\"0 0 16 16\" style=\"vertical-align: text-bottom; margin-right: 4px;\">\n                    <path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/>\n                </svg> \n            " + v389);
                    }
                    v$56.attr({
                      "data-post-id": p160.data("post-id"),
                      "data-post-title": v387,
                      "data-post-url": v377,
                      "data-post-image": v385 || v386
                    });
                    $("#preview-image").css("background-image", "url(" + (v385 || v386) + ")");
                    $("#preview-title").text(v387);
                    $("#preview-synopsis").text(v388);
                    $("#preview-year").text(v390);
                    $("#preview-genres").html(v391.map(p163 => "<span class=\"genre-tag\">" + p163 + "</span>").join(""));
                    $("#preview-play-btn, #preview-more-link").attr("href", v377);
                    v$57.data("current-url", v377).removeClass("loading");
                    $(document).trigger("abefilm:preview_shown", {
                      $button: v$56
                    });
                  }
                }).fail(function (p164, p165) {
                  if (p165 !== "abort") {
                    vF26();
                  }
                });
              } else {
                v$57.removeClass("loading");
                $(document).trigger("abefilm:preview_shown", {
                  $button: $("#preview-popup .watchlist-btn")
                });
              }
            }
          }
        };
        let vF26 = function () {
          clearTimeout(v392);
          clearTimeout(v393);
          v$57.removeClass("visible");
          setTimeout(function () {
            if (!v394) {
              v$57.hide().removeClass("loading").data("current-url", "");
            }
          }, 200);
        };
        var vVF25 = vF25;
        var vVF26 = vF26;
        var v$57 = $("#preview-popup");
        var v392;
        var v393;
        var v394 = null;
        var v395 = null;
        $("body").on("mouseenter", ".index-post, #preview-popup", function () {
          clearTimeout(v393);
          if ($(this).hasClass("index-post")) {
            var v$58 = $(this);
            v394 = v$58;
            v392 = setTimeout(function () {
              if (v394 && v394.is(v$58)) {
                vF25(v$58);
              }
            }, 400);
          }
        });
        $("body").on("mouseleave", ".index-post, #preview-popup", function () {
          clearTimeout(v392);
          v393 = setTimeout(vF26, 200);
        });
        $(document).on("mouseover", function (p166) {
          if (!$(p166.target).closest(".index-post, .preview-card-popup").length) {
            v394 = null;
            vF26();
          }
        });
      }
      let v$59 = $(".head-widget .BlogSearch input");
      let v$60 = $("#search-suggestions-container");
      let vLSBloggerSearchHistory = "bloggerSearchHistory";
      let vLSBloggerPopularCache = "bloggerPopularCache";
      let v396 = null;
      let vF27 = () => {
        v$60.empty().show();
        vF32();
        vF33();
      };
      let vF28 = () => {
        v$60.hide();
      };
      let vF29 = p167 => {
        $.ajax({
          url: "/feeds/posts/default?alt=json-in-script&q=" + encodeURIComponent(p167) + "&max-results=10",
          type: "get",
          dataType: "jsonp",
          success: function (p168) {
            let v397 = p168.feed.entry || [];
            v$60.empty().show();
            if (v397.length === 0) {
              v$60.html("<div class=\"suggestion-item no-results\">No results</div>");
              return;
            }
            v$60.append("<ul class=\"suggestions-list\">" + v397.map(p169 => {
              let v398 = p169.title.$t;
              let v399 = v398.toLowerCase().indexOf(p167.toLowerCase());
              let vV398 = v398;
              if (v399 !== -1) {
                let v400 = v398.substring(v399, v399 + p167.length);
                vV398 = v398.substring(0, v399) + "<strong>" + v400 + "</strong>" + v398.substring(v399 + p167.length);
              }
              return "<li class=\"suggestion-item\"><a href=\"" + p169.link.find(p170 => p170.rel === "alternate").href + "\">" + vV398 + "</a></li>";
            }).join("") + "</ul>");
          },
          error: function () {
            v$60.html("<div class=\"no-results\">Error</div>");
          }
        });
      };
      let vF30 = () => JSON.parse(localStorage.getItem(vLSBloggerSearchHistory)) || [];
      let vF31 = p171 => {
        if (!p171.trim()) {
          return;
        }
        let v401 = vF30().filter(p172 => p172.toLowerCase() !== p171.toLowerCase());
        v401.unshift(p171);
        if (v401.length > 3) {
          v401.length = 3;
        }
        localStorage.setItem(vLSBloggerSearchHistory, JSON.stringify(v401));
      };
      let vF32 = () => {
        let vVF30 = vF30();
        if (vVF30.length > 0) {
          v$60.append("<div class=\"suggestions-header\"><span>Search history</span><span class=\"delete-all-icon\" title=\"Clear\"><svg viewBox=\"0 0 24 24\"><path d=\"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z\"></path></svg></span></div><ul class=\"suggestions-list\">" + vVF30.map(p173 => "<li class=\"suggestion-item history-item\"><a href=\"/search?q=" + encodeURIComponent(p173) + "\" class=\"history-item-text\">" + p173 + "</a><span class=\"remove-history-item\" data-term=\"" + p173 + "\">&#10005;</span></li>").join("") + "</ul>");
        }
      };
      let vF33 = () => {
        let v402 = sessionStorage.getItem(vLSBloggerPopularCache);
        if (v402) {
          let v403 = JSON.parse(v402);
          if (Date.now() - v403.timestamp < 900000) {
            vF34(v403.html);
            return;
          }
        }
        $.ajax({
          url: "/feeds/posts/default?alt=json-in-script&max-results=7",
          type: "get",
          dataType: "jsonp",
          success: function (p174) {
            if (!p174.feed.entry || p174.feed.entry.length === 0) {
              return;
            }
            let v404 = "<div class=\"suggestions-header\"><span>🔥 Latest Posts</span></div><ul class=\"suggestions-list\">" + p174.feed.entry.map((p175, p176) => "<li class=\"suggestion-item popular-item\"><a href=\"" + p175.link.find(p177 => p177.rel === "alternate").href + "\"><span class=\"popular-rank " + (p176 < 3 ? "top-3" : "") + "\">" + (p176 + 1) + "</span><span class=\"popular-title\">" + p175.title.$t + "</span></a></li>").join("") + "</ul>";
            sessionStorage.setItem(vLSBloggerPopularCache, JSON.stringify({
              html: v404,
              timestamp: Date.now()
            }));
            vF34(v404);
          }
        });
      };
      let vF34 = p178 => {
        if (vF30().length > 0) {
          v$60.append("<div class=\"suggestions-divider\"></div>");
        }
        v$60.append(p178);
      };
      v$59.on("focus", vF27).on("keyup", function () {
        let v405 = $(this).val().trim();
        clearTimeout(v396);
        if (v405.length < 2) {
          vF27();
          return;
        }
        v396 = setTimeout(() => vF29(v405), 300);
      });
      $(document).on("click", function (p179) {
        if (!$(p179.target).closest(".BlogSearch").length) {
          vF28();
        }
      });
      $(".head-widget .BlogSearch form").on("submit", function () {
        vF31(v$59.val());
      });
      v$60.on("click", ".remove-history-item", function (p180) {
        p180.stopPropagation();
        let v406 = vF30().filter(p181 => p181 !== $(this).data("term"));
        localStorage.setItem(vLSBloggerSearchHistory, JSON.stringify(v406));
        vF27();
      });
      v$60.on("click", ".delete-all-icon", function (p182) {
        p182.stopPropagation();
        localStorage.removeItem(vLSBloggerSearchHistory);
        vF27();
      });
      $(document).on("click", function (p183) {
        let v$61 = $(p183.target);
        let v407 = v$61.closest("[data-panel-target]");
        if (!v407.length && !v$61.closest(".header-dropdown-panel").length) {
          $(".header-dropdown-panel").removeClass("is-visible");
          return;
        }
        if (v407.length) {
          p183.preventDefault();
          p183.stopPropagation();
          let v408 = v407.data("panel-target");
          let v$62 = $(v408);
          let v409 = v$62.hasClass("is-visible");
          $(".header-dropdown-panel").removeClass("is-visible");
          if (!v409) {
            v$62.addClass("is-visible");
            if (v408 === "#notification-panel") {
              $("#notification-panel-content").html($("#header-notifications").html());
            }
          }
        }
      });
      function f40() {
        var v$63 = $("#celebrity-carousel-widgets");
        var v$64 = $(".celebrity-carousel-wrapper");
        var v410 = v$63.find(".widget.Image");
        if (v410.length > 0) {
          var v$65 = $("<div class=\"owl-carousel owl-theme\" id=\"celebrity-carousel\"></div>");
          v410.each(function () {
            var v$66 = $(this);
            var v411 = v$66.find(".data-title").text().trim();
            var v412 = v$66.find(".data-caption").text().trim();
            var v413 = v$66.find("img").attr("src");
            var v414 = v$66.find("a").attr("href");
            if (v413) {
              v$65.append("<div class=\"celebrity-item\"><a href=\"" + (v414 || "#") + "\"><img class=\"celebrity-image\" src=\"" + v413.replace(/\/s\d+(-[a-z0-9]+)*\//, "/s150-c/") + "\" alt=\"" + v411 + "\" loading=\"lazy\" width=\"100\" height=\"100\"/><span class=\"celebrity-name\">" + v411 + "</span>" + (v412 ? "<span class=\"celebrity-role\">" + v412 + "</span>" : "") + "</a></div>");
            }
          });
          if (v$65.children().length > 0) {
            const vO108 = {
              loop: !1,
              margin: 16,
              nav: !0,
              dots: !1,
              navText: ["<svg viewBox=\"0 0 16 16\"><path d=\"M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z\"/></svg>", "<svg viewBox=\"0 0 16 16\"><path d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg>"],
              responsive: {
                "0": {
                  items: 3,
                  margin: 12
                },
                "480": {
                  items: 4
                },
                "768": {
                  items: 6
                },
                "1024": {
                  items: 8
                }
              }
            };
            v$64.empty().append(v$65);
            v$65.owlCarousel(vO108);
            var v415 = v$64.find(".owl-nav .owl-prev");
            if (v415.length) {
              v415.removeAttr("role").attr("aria-label", "Previous items");
            }
            var v416 = v$64.find(".owl-nav .owl-next");
            if (v416.length) {
              v416.removeAttr("role").attr("aria-label", "Next items");
            }
          }
        }
      }
      setTimeout(f40, 200);
    })();
    f3();
    if (typeof blogger == "object" && blogger.widgets && blogger.widgets.makePostsExpandable) {
      blogger.widgets.makePostsExpandable();
    }
    if (typeof _WidgetManager !== "undefined" && _WidgetManager.init) {
      _WidgetManager.init();
    }
    f();
    f6();
    f5();
    $(window).on("scroll resize", f5);
    $(document).on("translated.owl.carousel changed.owl.carousel", ".owl-carousel", f5);
    $(document).on("translated.owl.carousel", ".owl-carousel", function () {
      f5();
    });
    setTimeout(f5, 200);
    f4("#Blog1");
    $("#Blog1 .index-post-wrap").addClass("posts-loaded");
    f15();
    f17();
    f20();
    f2();
    f22();
    f14();
    f27();
    f25();
    f29();
    f30();
    $("div[data-shortcode*=\"$style=\"]").each(function () {
      var v417 = $(this).data("shortcode");
      if (v417.includes("$style={grid}")) {
        $(this).parent(".widget").addClass("abefilm-static-grid");
      } else if (v417.includes("$style={nowrap}")) {
        $(this).parent(".widget").addClass("abefilm-carousel-widget");
      } else if (v417.includes("$style={wide-list}")) {
        $(this).parent(".widget").addClass("abefilm-wide-list");
      } else if (v417.includes("$style={ranked-grid-alt}")) {
        $(this).parent(".widget").addClass("abefilm-ranked-grid");
      }
    });
    $("#back-top").on("click", function (p184) {
      p184.preventDefault();
      $("html, body").animate({
        scrollTop: 0
      }, 500);
    });
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 300) {
        $("#back-top").addClass("on");
      } else {
        $("#back-top").removeClass("on");
      }
    });
    if (typeof updateWatchlistBadge == "function") {
      updateWatchlistBadge();
    }
    if (typeof updateHistoryBadge == "function") {
      updateHistoryBadge();
    }
    if (typeof updateNotificationCount == "function") {
      updateNotificationCount();
    }
    if ($(".leaderboard-page-container").length) {
      let vF35 = function () {
        if (v430) {
          v430.disconnect();
        }
        let v418 = document.querySelectorAll("img.lazy-load:not(.loaded)");
        if ("IntersectionObserver" in window) {
          v430 = new IntersectionObserver((p185, p186) => {
            p185.forEach(p187 => {
              if (p187.isIntersecting) {
                let v419 = p187.target;
                v419.src = v419.dataset.src;
                v419.onload = () => v419.classList.add("loaded");
                v419.classList.remove("lazy-load");
                p186.unobserve(v419);
              }
            });
          }, {
            rootMargin: "0px 0px 250px 0px"
          });
          v418.forEach(p188 => v430.observe(p188));
        } else {
          v418.forEach(p189 => p189.src = p189.dataset.src);
        }
      };
      let vF36 = function () {
        if (v428 || vLN013 >= vA10.length) {
          v$68.find(".loader").remove();
          return;
        }
        v428 = !0;
        if (v$68.find(".loader").length === 0) {
          v$68.append("<div class=\"loader\" style=\"margin: 20px auto;\"></div>");
        }
        let v420 = vA10.slice(vLN013, vLN013 + vLN10);
        let vLS15 = "";
        v420.forEach((p190, p191) => {
          let v421 = vLN013 + p191 + 1;
          vLS15 += "\n            <a href=\"" + p190.url + "\" class=\"leaderboard-item\">\n                <div class=\"rank-number\">" + v421 + "</div>\n                <div class=\"item-thumb\">\n                    <img class=\"lazy-load\" src=\"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\" data-src=\"" + p190.imageUrl + "\" alt=\"" + p190.title + "\"/>\n                </div>\n                <div class=\"item-info\">\n                    <h4 class=\"item-title\">" + p190.title + "</h4>\n                    <div class=\"item-meta\">\n                        " + (p190.rating ? "<span class=\"rating\">⭐ " + p190.rating.toFixed(1) + "</span>" : "") + "\n                        " + (p190.year ? "<span>·</span><span>" + p190.year + "</span>" : "") + "\n                        <span class=\"item-genres\">" + p190.genres.slice(0, 2).join(" · ") + "</span>\n                    </div>\n                    <p class=\"item-synopsis\">" + p190.synopsis + "</p>\n                </div>\n            </a>";
        });
        v$68.find(".loader").remove();
        v$68.append(vLS15);
        vF35();
        vLN013 += vLN10;
        v428 = !1;
        if (vLN013 < vA10.length) {
          v$68.append("<div class=\"loader\" style=\"margin: 20px auto;\"></div>");
        }
      };
      var vVF35 = vF35;
      var vVF36 = vF36;
      let v422 = document.querySelector(".leaderboard-filters");
      if (v422) {
        let v423 = !1;
        let v424;
        let v425;
        v422.addEventListener("mousedown", p192 => {
          v423 = true;
          v422.classList.add("active");
          v424 = p192.pageX - v422.offsetLeft;
          v425 = v422.scrollLeft;
          p192.preventDefault();
        });
        v422.addEventListener("mouseleave", () => {
          v423 = !1;
          v422.classList.remove("active");
        });
        v422.addEventListener("mouseup", () => {
          v423 = !1;
          v422.classList.remove("active");
        });
        v422.addEventListener("mousemove", p193 => {
          if (!v423) {
            return;
          }
          p193.preventDefault();
          let v426 = p193.pageX - v422.offsetLeft;
          let v427 = (v426 - v424) * 2;
          v422.scrollLeft = v425 - v427;
        });
      }
      let vA10 = [];
      let vLN013 = 0;
      let vLN10 = 10;
      let v428 = !1;
      let v429 = null;
      let vA11 = [{
        name: "Latest Post",
        type: "latest"
      }, {
        name: "Hot Updates",
        type: "trending"
      }, {
        name: "Top Rating",
        type: "top-rating"
      }, {
        name: "Movie",
        type: "label"
      }, {
        name: "TV Series",
        type: "label"
      }, {
        name: "Action",
        type: "label"
      }, {
        name: "Romance",
        type: "label"
      }, {
        name: "Horror",
        type: "label"
      }, {
        name: "Comedy",
        type: "label"
      }, {
        name: "Thriller",
        type: "label"
      }, {
        name: "Fantasy",
        type: "label"
      }, {
        name: "Animation",
        type: "label"
      }, {
        name: "Adventure",
        type: "label"
      }, {
        name: "Crime",
        type: "label"
      }, {
        name: "Documentary",
        type: "label"
      }, {
        name: "Drama",
        type: "label"
      }, {
        name: "Family",
        type: "label"
      }, {
        name: "History",
        type: "label"
      }, {
        name: "Music",
        type: "label"
      }, {
        name: "Mystery",
        type: "label"
      }, {
        name: "Science Fiction",
        type: "label"
      }, {
        name: "War",
        type: "label"
      }, {
        name: "Western",
        type: "label"
      }];
      let v$67 = $(".leaderboard-filters");
      let v$68 = $(".leaderboard-list");
      vA11.forEach(p194 => {
        v$67.append("<button class=\"filter-btn\" data-type=\"" + p194.type + "\" data-name=\"" + p194.name + "\">" + p194.name + "</button>");
      });
      let v430;
      async function f41(p195) {
        let vLN13 = 1;
        let vLN102 = 10;
        let v431 = !1;
        let v432 = !1;
        let vA12 = [];
        let v$69 = $(".leaderboard-list");
        let v$70 = $(".leaderboard-header");
        $(window).off("scroll.leaderboard");
        v$69.html("");
        async function f42(p196) {
          if (v431 || v432) {
            return;
          }
          v431 = !0;
          if (v$69.find(".loader").length === 0) {
            v$69.append("<div class=\"loader\" style=\"margin: 20px auto; grid-column: 1 / -1;\"></div>");
          }
          if (p195.type === "top-rating" && vA12.length > 0) {
            let v433 = p196 - 1;
            let v434 = v433 + vLN102;
            let v435 = vA12.slice(v433, v434);
            if (v434 >= vA12.length) {
              v432 = true;
            }
            f43(v435, p196);
            v431 = !1;
            return;
          }
          let vLS16 = "";
          let v436 = p195.type === "top-rating" ? 150 : vLN102;
          let v437 = (p195.type === "label" || p195.type === "top-rating") && p195.name ? "/-/" + encodeURIComponent(p195.name) : "";
          let v438 = p195.type === "latest" || p195.type === "trending" ? "&orderby=" + (p195.type === "latest" ? "published" : "updated") : "";
          vLS16 = "/feeds/posts/default" + v437 + "?alt=json-in-script&max-results=" + v436 + "&start-index=" + p196 + v438;
          try {
            const vO133 = {
              url: vLS16,
              dataType: "jsonp"
            };
            let v439 = (await $.ajax(vO133)).feed.entry || [];
            if (v439.length < v436 && p195.type !== "top-rating") {
              v432 = true;
            }
            let v440 = v439.map(p197 => $.get(p197.link.find(p198 => p198.rel === "alternate").href).then(p199 => {
              let v$71 = $(p199);
              let v441 = v$71.find("#extra-meta");
              return {
                title: p197.title.$t,
                url: p197.link.find(p200 => p200.rel === "alternate").href,
                imageUrl: v$71.find("img[alt=\"poster\"]").attr("src"),
                backdropUrl: v$71.find("span.slider-backdrop").text().trim(),
                rating: parseFloat(v441.find(".meta-rating").text().trim()) || 0,
                year: v441.find(".meta-year").text().trim(),
                genres: v441.find(".meta-genre").map((p201, p202) => $(p202).text().trim()).get(),
                synopsis: v$71.find("#overview-data").text().trim()
              };
            }).fail(() => null));
            let v442 = (await Promise.all(v440)).filter(Boolean);
            if (p195.type === "top-rating") {
              v442.sort((p203, p204) => p204.rating - p203.rating);
              vA12 = v442;
              let v443 = vA12.slice(0, vLN102);
              f43(v443, 1);
              if (vLN102 >= vA12.length) {
                v432 = true;
              }
            } else {
              f43(v442, p196);
            }
          } catch (e9) {
            console.error("Error fetching leaderboard data:", e9);
            v$69.find(".loader").remove();
          } finally {
            v431 = !1;
          }
        }
        function f43(p205, p206) {
          v$69.find(".loader").remove();
          if (p205.length === 0 && p206 === 1) {
            v$69.html("<p style=\"text-align:center; padding: 40px 0; grid-column: 1 / -1;\">No posts found for this category.</p>");
            return;
          }
          let vLS17 = "";
          p205.forEach((p207, p208) => {
            let v444 = p206 + p208;
            vLS17 += "\n                <a href=\"" + p207.url + "\" class=\"leaderboard-item\">\n                    <div class=\"rank-number\">" + v444 + "</div>\n                    <div class=\"item-thumb\"><img class=\"lazy-load\" src=\"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\" data-src=\"" + p207.imageUrl + "\" alt=\"" + p207.title + "\"/></div>\n                    <div class=\"item-info\">\n                        <h4 class=\"item-title\">" + p207.title + "</h4>\n                        <div class=\"item-meta\">\n                            " + (p207.rating ? "<span class=\"rating\">⭐ " + p207.rating.toFixed(1) + "</span>" : "") + "\n                            " + (p207.year ? "<span>·</span><span>" + p207.year + "</span>" : "") + "\n                            <span class=\"item-genres\">" + p207.genres.slice(0, 2).join(" · ") + "</span>\n                        </div>\n                        <p class=\"item-synopsis\">" + p207.synopsis + "</p>\n                    </div>\n                </a>";
          });
          v$69.append(vLS17);
          vLN13 = p206 + p205.length;
          if (typeof vF35 == "function") {
            vF35();
          }
        }
        await f42(1);
        setTimeout(() => {
          let v445 = v$69.find(".leaderboard-item:first");
          if (v445.length) {
            $.get(v445.attr("href")).then(p209 => {
              let v446 = $(p209).find("span.slider-backdrop").text().trim();
              if (v446) {
                v$70.css("background-image", "url(" + v446 + ")");
              }
            });
          }
        }, 500);
        $(window).on("scroll.leaderboard", function () {
          if (!v431 && !v432 && !!v$69.is(":visible")) {
            if ($(window).scrollTop() + $(window).height() >= $(document).height() - 400) {
              f42(vLN13);
            }
          }
        });
      }
      v$67.on("click", ".filter-btn", function () {
        let v$72 = $(this);
        let vO134 = {
          name: v$72.data("name"),
          type: v$72.data("type")
        };
        if (JSON.stringify(vO134) !== JSON.stringify(v429)) {
          v$67.find(".active").removeClass("active");
          v$72.addClass("active");
          v$72[0].scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest"
          });
          f41(vO134);
        }
      });
      let v447 = new URLSearchParams(window.location.search).get("filter");
      let v448 = !1;
      if (v447) {
        let v$73 = $(".filter-btn[data-name*=\"" + decodeURIComponent(v447) + "\"]");
        if (v$73.length) {
          v$73.trigger("click");
          v448 = true;
        }
      }
      if (!v448) {
        v$67.find(".filter-btn").first().trigger("click");
      }
    }
  });
  function f44() {
    let v449 = document.getElementById("mobile-search-modal");
    if (!v449) {
      return;
    }
    let v450 = document.querySelectorAll(".mobile-search-input, .mobile-search-button");
    let v451 = document.getElementById("ms-back-btn");
    let v452 = document.getElementById("ms-input");
    let v453 = document.getElementById("ms-form");
    let v454 = document.getElementById("ms-default-view");
    let v455 = document.getElementById("ms-results-view");
    let v456 = document.getElementById("ms-history-container");
    let v457 = document.getElementById("ms-popular-container");
    let vLSAbefilmSearchHistory = "abefilmSearchHistory";
    let v458;
    let vF37 = () => {
      v449.classList.add("active");
      document.body.classList.add("ms-modal-open");
      v452.focus();
      vF45();
    };
    let vF38 = () => {
      v449.classList.remove("active");
      document.body.classList.remove("ms-modal-open");
      v452.value = "";
      vF46();
    };
    let vF39 = () => JSON.parse(localStorage.getItem(vLSAbefilmSearchHistory) || "[]");
    let vF40 = p210 => {
      if (!p210 || !p210.trim()) {
        return;
      }
      let v459 = vF39().filter(p211 => p211.toLowerCase() !== p210.toLowerCase());
      v459.unshift(p210);
      if (v459.length > 3) {
        v459.pop();
      }
      localStorage.setItem(vLSAbefilmSearchHistory, JSON.stringify(v459));
    };
    let vF41 = p212 => {
      let v460 = vF39().filter(p213 => p213.toLowerCase() !== p212.toLowerCase());
      localStorage.setItem(vLSAbefilmSearchHistory, JSON.stringify(v460));
      vF43();
    };
    let vF42 = () => {
      localStorage.removeItem(vLSAbefilmSearchHistory);
      vF43();
    };
    let vF43 = () => {
      let vVF39 = vF39();
      if (vVF39.length === 0) {
        v456.innerHTML = "";
        return;
      }
      let vLSdivClassmssectiontit = "\n            <div class=\"ms-section-title ms-history-header\">\n                <span>Search History</span>\n                <button class=\"clear-btn\">Clear All</button>\n            </div>\n            <ul>";
      vVF39.forEach(p214 => {
        vLSdivClassmssectiontit += "\n                <li>\n                    <a href=\"/search?q=" + encodeURIComponent(p214) + "\">" + p214 + "</a>\n                    <button class=\"delete-item-btn\" data-term=\"" + p214 + "\">&times;</button>\n                </li>";
      });
      vLSdivClassmssectiontit += "</ul>";
      v456.innerHTML = vLSdivClassmssectiontit;
    };
    let vF44 = () => {
      v457.innerHTML = "\n        <div class=\"ms-section-title ms-popular-header\">\n            <span>🔥 Latest Posts</span>\n        </div>\n        <div class=\"ms-loader\">Loading...</div>";
      fetch("/feeds/posts/default?alt=json&max-results=8&orderby=published").then(p215 => p215.json()).then(p216 => {
        if (!p216.feed || !p216.feed.entry || p216.feed.entry.length === 0) {
          v457.innerHTML = "";
          return;
        }
        let vLSdivClassmssectiontit2 = "\n                <div class=\"ms-section-title ms-popular-header\">\n                    <span>🔥 Latest Posts</span>\n                </div>\n                <ul>";
        p216.feed.entry.forEach((p217, p218) => {
          let v461 = p217.link.find(p219 => p219.rel === "alternate").href;
          vLSdivClassmssectiontit2 += "\n                    <li>\n                        <span class=\"rank-number " + (p218 < 3 ? "top-3" : "") + "\">" + (p218 + 1) + "</span>\n                        <a href=\"" + v461 + "\">" + p217.title.$t + "</a>\n                    </li>";
        });
        vLSdivClassmssectiontit2 += "</ul>";
        v457.innerHTML = vLSdivClassmssectiontit2;
      }).catch(p220 => {
        console.error("Error fetching popular posts:", p220);
        v457.innerHTML = "";
      });
    };
    let vF45 = () => {
      vF43();
      vF44();
    };
    let vF46 = () => {
      v454.style.display = "block";
      v455.style.display = "none";
    };
    window.renderDefaultView = vF45;
    let vF47 = () => {
      v454.style.display = "none";
      v455.style.display = "block";
    };
    let vF48 = p221 => {
      vF47();
      v455.innerHTML = "<div class=\"ms-loader\">Searching...</div>";
      fetch("/feeds/posts/default?alt=json&q=" + encodeURIComponent(p221) + "&max-results=10").then(p222 => p222.json()).then(p223 => {
        if (!p223.feed || !p223.feed.entry || p223.feed.entry.length === 0) {
          v455.innerHTML = "<div class=\"ms-no-results\">No results found.</div>";
          return;
        }
        let v462 = p223.feed.entry.map(p224 => {
          let v463 = p224.link.find(p225 => p225.rel === "alternate").href;
          return fetch(v463).then(p226 => p226.text()).then(p227 => {
            let v464 = new DOMParser().parseFromString(p227, "text/html");
            let v465 = v464.querySelector("img[alt=\"poster\"]")?.src || "https://resources.blogblog.com/img/blank.gif";
            let v466 = v464.querySelector("#extra-meta .meta-year")?.textContent.trim() || "";
            let v467 = v464.querySelector("#extra-meta .meta-type")?.textContent.trim() || "";
            const vO135 = {
              title: p224.title.$t,
              url: v463,
              imageUrl: v465,
              year: v466,
              type: v467
            };
            return vO135;
          }).catch(() => null);
        });
        Promise.all(v462).then(p228 => {
          let v468 = p228.filter(Boolean);
          if (v468.length === 0) {
            v455.innerHTML = "<div class=\"ms-no-results\">No results found.</div>";
            return;
          }
          let vLSul = "<ul>";
          v468.forEach(p229 => {
            vLSul += "\n                            <li>\n                                <a href=\"" + p229.url + "\">\n                                    <img class=\"result-thumb\" src=\"" + p229.imageUrl + "\" alt=\"" + p229.title + "\" loading=\"lazy\"/>\n                                    <div class=\"result-info\">\n                                        <h3 class=\"title\">" + p229.title + "</h3>\n                                        <p class=\"meta\">" + p229.year + (p229.year && p229.type ? " · " : "") + p229.type + "</p>\n                                    </div>\n                                </a>\n                            </li>";
          });
          vLSul += "</ul>";
          v455.innerHTML = vLSul;
          v455.addEventListener("click", p230 => {
            let v469 = p230.target.closest("a");
            if (v469) {
              p230.preventDefault();
              let v470 = v452.value.trim();
              vF40(v470);
              window.location.href = v469.href;
            }
          });
        });
      }).catch(p231 => {
        v455.innerHTML = "<div class=\"ms-no-results\">An error occurred.</div>";
      });
    };
    v450.forEach(p232 => {
      p232.addEventListener("click", p233 => {
        p233.preventDefault();
        vF37();
      });
      p232.addEventListener("focus", p234 => {
        p234.preventDefault();
        p234.target.blur();
        vF37();
      });
    });
    v451.addEventListener("click", vF38);
    v452.addEventListener("input", () => {
      clearTimeout(v458);
      let v471 = v452.value.trim();
      if (v471.length > 1) {
        v458 = setTimeout(() => {
          vF48(v471);
        }, 300);
      } else {
        vF46();
      }
    });
    v453.addEventListener("submit", p235 => {
      p235.preventDefault();
      let v472 = v452.value.trim();
      if (v472) {
        vF40(v472);
        window.location.href = "/search?q=" + encodeURIComponent(v472);
      }
    });
    v456.addEventListener("click", p236 => {
      if (p236.target.classList.contains("delete-item-btn")) {
        vF41(p236.target.dataset.term);
      }
      if (p236.target.classList.contains("clear-btn")) {
        vF42();
      }
    });
    let v473 = document.getElementById("bottom-nav-search-trigger");
    if (v473) {
      v473.addEventListener("click", p237 => {
        p237.preventDefault();
        vF37();
      });
    }
  }
  document.addEventListener("DOMContentLoaded", f44);
  (function () {
    let vLSAbefilm_favorites = "abefilm_favorites";
    let vLSsvgViewBox002424path3 = "<svg viewBox=\"0 0 24 24\"><path d=\"M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z\"/></svg>";
    let vLSsvgViewBox002424path4 = "<svg viewBox=\"0 0 24 24\"><path d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\"/></svg>";
    let vF49 = () => JSON.parse(localStorage.getItem(vLSAbefilm_favorites) || "[]");
    let vF50 = p238 => localStorage.setItem(vLSAbefilm_favorites, JSON.stringify(p238));
    let vF51 = p239 => vF49().includes(String(p239));
    function f45(p240) {
      let v$74 = $(p240);
      let v474 = v$74.attr("data-post-id");
      if (vF51(v474)) {
        v$74.addClass("favorited").attr("title", "Remove from Favorites");
        v$74.html(vLSsvgViewBox002424path4 + "<span>Favorited</span>");
      } else {
        v$74.removeClass("favorited").attr("title", "Add to Favorites");
        v$74.html(vLSsvgViewBox002424path3 + "<span>Favorite</span>");
      }
    }
    function f46() {
      $(".favorite-btn").each(function () {
        let v$75 = $(this);
        if (!v$75.attr("data-post-id")) {
          let v475 = v$75.siblings(".add-list-btn");
          v$75.attr("data-post-id", v475.attr("data-post-id"));
        }
        f45(this);
      });
    }
    $(document).on("click", ".favorite-btn", function (p241) {
      p241.preventDefault();
      let v476 = $(this).attr("data-post-id");
      if (!v476) {
        return;
      }
      let vVF49 = vF49();
      if (vF51(v476)) {
        vVF49 = vVF49.filter(p242 => p242 !== String(v476));
      } else {
        vVF49.unshift(String(v476));
      }
      vF50(vVF49);
      $(".favorite-btn[data-post-id=\"" + v476 + "\"]").each(function () {
        f45(this);
      });
    });
    $(document).ready(function () {
      f46();
    });
    $(document).on("abefilm:postDataReady", function () {
      f46();
    });
  })();
  document.addEventListener("DOMContentLoaded", function () {
    let v477 = document.getElementById("dynamic-share-btn");
    if (!v477) {
      return;
    }
    let v478 = document.getElementById("share-fallback-modal");
    if (v478) {
      let v479 = v478.querySelector(".share-modal-close");
      let v480 = v478.querySelector("#share-copy-btn");
      let v481 = v478.querySelector("#share-url-input");
      let vF52 = (p243, p244) => {
        v478.querySelector(".share-link-facebook").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(p244);
        v478.querySelector(".share-link-twitter").href = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(p244) + "&text=" + encodeURIComponent(p243);
        v478.querySelector(".share-link-whatsapp").href = "https://api.whatsapp.com/send?text=" + encodeURIComponent(p243 + " " + p244);
        v478.querySelector(".share-link-telegram").href = "https://t.me/share/url?url=" + encodeURIComponent(p244) + "&text=" + encodeURIComponent(p243);
        v481.value = p244;
        v478.classList.add("is-visible");
      };
      let vF53 = () => v478.classList.remove("is-visible");
      v479.addEventListener("click", vF53);
      v478.addEventListener("click", p245 => {
        if (p245.target === v478) {
          vF53();
        }
      });
      v480.addEventListener("click", () => {
        v481.select();
        document.execCommand("copy");
        v480.textContent = "Copied!";
        setTimeout(() => {
          v480.textContent = "Copy";
        }, 2000);
      });
    }
    v477.addEventListener("click", async p246 => {
      p246.preventDefault();
      let v482 = document.title;
      let v483 = window.location.href;
      let vO136 = {
        title: v482,
        text: v482,
        url: v483
      };
      if (navigator.share) {
        try {
          await navigator.share(vO136);
          console.log("Content shared successfully");
        } catch (e10) {
          console.error("Error sharing:", e10);
        }
      } else if (v478) {
        openFallbackModal(v482, v483);
      } else {
        console.warn("Share API not supported and fallback modal not found.");
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    let v484 = document.getElementById("trailer-btn");
    let v485 = document.getElementById("trailer-modal");
    if (!v484 || !v485) {
      return;
    }
    let v486 = v485.querySelector("iframe");
    let v487 = v485.querySelector(".trailer-modal-close");
    let vF54 = () => {
      let v488 = document.getElementById("source-data-container");
      if (!v488) {
        alert("Trailer data not found.");
        return;
      }
      let v489 = v488.querySelector("#trailer-data");
      if (!v489 || !v489.textContent.trim()) {
        alert("Trailer not available for this item.");
        return;
      }
      let v490 = v489.textContent.trim();
      v490 += (v490.includes("?") ? "&" : "?") + "autoplay=1";
      v486.setAttribute("src", v490);
      v485.classList.add("is-visible");
    };
    let vF55 = () => {
      v485.classList.remove("is-visible");
      v486.setAttribute("src", "");
    };
    v484.addEventListener("click", p247 => {
      p247.preventDefault();
      vF54();
    });
    v487.addEventListener("click", vF55);
    v485.addEventListener("click", p248 => {
      if (p248.target === v485) {
        vF55();
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    let vF56 = (p249, p250) => {
      let v491 = document.getElementById(p249);
      let v492 = document.getElementById(p250);
      if (!v491 && v492) {
        v491 = v492.closest(".trigger-rating-link, .action-btn");
      }
      let v493 = document.getElementById("post-review-data");
      if (!v491 || !v493) {
        return;
      }
      let v494 = "sb_rated_" + v493.getAttribute("data-post-id");
      function f47() {
        if (!v492) {
          return;
        }
        let v495 = localStorage.getItem(v494) !== null;
        v492.textContent = v495 ? "My Rating" : "Rate now";
      }
      f47();
      v491.addEventListener("click", function (p251) {
        p251.preventDefault();
        let v496 = document.getElementById("review-system");
        if (!v496) {
          return;
        }
        if (window.innerWidth <= 767 && document.body.classList.contains("item-view")) {
          let v497 = document.querySelector(".mobile-tab-btn[data-tab-target=\"#comment-tab-content\"]");
          if (v497 && !v497.classList.contains("active")) {
            v497.click();
          }
          setTimeout(() => {
            v496.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }, 100);
        } else {
          v496.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      });
      let v498 = document.getElementById("review-summary-wrapper");
      const vO138 = {
        childList: !0,
        subtree: !0
      };
      if (v498) {
        new MutationObserver(f47).observe(v498, vO138);
      }
    };
    vF56("rating-shortcut-btn", "rating-shortcut-text");
    vF56("mobile-rating-trigger", "rating-trigger-text");
  });
  document.addEventListener("DOMContentLoaded", function () {
    let v499 = document.querySelector(".share-btn");
    if (!v499) {
      return;
    }
    let v500 = v499.querySelectorAll(".share-icon-wrapper");
    if (v500.length === 0) {
      return;
    }
    let vLN014 = 0;
    function f48() {
      v500.forEach(p252 => {
        p252.classList.remove("is-active", "is-next");
      });
      let v501 = v500[vLN014];
      let v502 = v500[(vLN014 + 1) % v500.length];
      v501.classList.add("is-active");
      v502.classList.add("is-next");
      vLN014 = (vLN014 + 1) % v500.length;
    }
    f48();
    setInterval(f48, 3000);
  });
  document.addEventListener("DOMContentLoaded", function () {
    let v503 = document.body;
    let v504 = document.getElementById("open-theme-settings-modal");
    let v505 = document.getElementById("theme-settings-overlay");
    let v506 = document.getElementById("ts-close-btn");
    let v507 = document.getElementById("light-mode-btn");
    let v508 = document.getElementById("dark-mode-btn");
    let v509 = document.querySelectorAll("#gradient-colors .ts-swatch");
    let v510 = document.getElementById("custom-color-input");
    let v511 = document.getElementById("custom-color-preview");
    let v512 = document.getElementById("custom-color-hex");
    let v513 = document.getElementById("safe-mode-button");
    let v514 = document.getElementById("safe-mode-status");
    if (v504 && v505) {
      v504.addEventListener("click", p253 => {
        p253.preventDefault();
        v505.style.display = "flex";
        setTimeout(() => v505.classList.add("is-visible"), 10);
      });
      let vF57 = () => {
        v505.classList.remove("is-visible");
        setTimeout(() => v505.style.display = "none", 200);
      };
      v506.addEventListener("click", vF57);
      v505.addEventListener("click", p254 => {
        if (p254.target === v505) {
          vF57();
        }
      });
    }
    function f49(p255) {
      v503.classList.toggle("dark-mode", p255);
      v507.classList.toggle("active", !p255);
      v508.classList.toggle("active", p255);
      localStorage.setItem("themeMode", p255 ? "dark" : "light");
    }
    if (v507 && v508) {
      v507.addEventListener("click", () => f49(false));
      v508.addEventListener("click", () => f49(true));
      f49(localStorage.getItem("themeMode") === "dark");
    }
    function f50(p256, p257 = null) {
      if (!p256) {
        return;
      }
      let v515 = p257 || p256;
      let v516 = document.documentElement;
      v516.style.setProperty("--keycolor", p256);
      v516.style.setProperty("--keygradient", v515);
      let vLN015 = 0;
      let vLN016 = 0;
      let vLN017 = 0;
      if (p256.startsWith("#") && p256.length === 7) {
        vLN015 = parseInt(p256.slice(1, 3), 16);
        vLN016 = parseInt(p256.slice(3, 5), 16);
        vLN017 = parseInt(p256.slice(5, 7), 16);
      }
      v516.style.setProperty("--keycolor-rgb", vLN015 + "," + vLN016 + "," + vLN017);
      localStorage.setItem("themeColor", p256);
      localStorage.setItem("themeGradient", v515);
      if (v511) {
        v511.style.background = v515;
      }
      if (v512) {
        v512.textContent = p256;
      }
      document.querySelectorAll(".ts-swatch").forEach(p258 => p258.classList.remove("active"));
      let v517 = document.querySelector(".ts-swatch[data-color=\"" + p256 + "\"]");
      if (v517) {
        v517.classList.add("active");
      }
    }
    let v518 = localStorage.getItem("themeColor");
    let v519 = localStorage.getItem("themeGradient");
    if (v518) {
      f50(v518, v519);
    } else {
      f50("#c8204e", "linear-gradient(to right, #c8204e, #9a1ba7)");
    }
    v509.forEach(p259 => p259.addEventListener("click", () => f50(p259.dataset.color, p259.dataset.gradient)));
    if (v510) {
      v510.addEventListener("input", () => f50(v510.value));
    }
    function f51(p260) {
      let v520 = document.getElementById("safe-mode-status");
      let v521 = document.getElementById("safe-mode-status-mobile");
      localStorage.setItem("matureFilterActive", p260);
      document.body.classList.toggle("mature-filter-active", p260);
      let v522 = p260 ? "On" : "Off";
      if (v520) {
        v520.textContent = v522;
      }
      if (v521) {
        v521.textContent = v522;
      }
    }
    let v523 = localStorage.getItem("matureFilterActive") === "true";
    f51(v523);
    document.body.addEventListener("click", function (p261) {
      if (!p261.target.closest("#safe-mode-button, #safe-mode-button-mobile")) {
        return;
      }
      p261.preventDefault();
      let v524 = localStorage.getItem("matureFilterActive") === "true";
      f51(!v524);
    });
    let v525 = document.getElementById("comments");
    if (v525) {
      v525.addEventListener("click", function (p262) {
        let v526 = p262.target.closest(".qa-footer");
        if (v526) {
          p262.preventDefault();
          let v527 = v526.closest(".qa-card");
          if (v527) {
            let v528 = document.querySelector(".comment[data-qa-id=\"" + v527.dataset.qaId + "\"]");
            if (v528) {
              let v529 = v528.querySelector(".comment-actions a.comment-reply");
              if (v529) {
                v529.click();
              }
            }
          }
        }
      });
    }
    let v530 = document.getElementById("sidebarToggle");
    setTimeout(() => {
      v503.classList.remove("no-transition");
    }, 100);
    if (v530) {
      v530.addEventListener("click", () => {
        v503.classList.toggle("sidebar-collapsed");
        localStorage.setItem("sidebarState", v503.classList.contains("sidebar-collapsed") ? "collapsed" : "expanded");
        setTimeout(function () {
          if (typeof $ !== "undefined" && $.fn.owlCarousel) {
            $("#dynamic-main-slider, #PopularPosts1 .owl-carousel").trigger("refresh.owl.carousel");
          }
        }, 350);
      });
    }
    let v531 = [].slice.call(document.querySelectorAll(".lazy-bg"));
    if ("IntersectionObserver" in window) {
      let v532 = new IntersectionObserver(function (p263, p264) {
        p263.forEach(function (p265) {
          if (p265.isIntersecting) {
            let v533 = p265.target;
            let v534 = v533.getAttribute("data-bg-image");
            if (v534) {
              v533.style.backgroundImage = "url(" + v534 + ")";
              v533.classList.remove("lazy-bg");
              v532.unobserve(v533);
            }
          }
        });
      }, {
        rootMargin: "0px 0px 200px 0px"
      });
      v531.forEach(function (p266) {
        v532.observe(p266);
      });
    } else {
      v531.forEach(function (p267) {
        let v535 = p267.getAttribute("data-bg-image");
        if (v535) {
          p267.style.backgroundImage = "url(" + v535 + ")";
        }
      });
    }
  });
  (function (p268) {
    p268(document).ready(function () {
      function f52() {
        let v536 = document.getElementById("popular-posts-carousel");
        if (!v536) {
          console.log("Ranking Number script: Carousel not found.");
          return;
        }
        let vF58 = () => {
          v536.querySelectorAll(".owl-item .index-post").forEach((p269, p270) => {
            if (p269.querySelector(".ranking-number")) {
              return;
            }
            let v537 = p269.querySelector(".entry-image-wrap");
            if (v537) {
              let v538 = document.createElement("span");
              v538.className = "ranking-number";
              v538.textContent = p270 + 1;
              v537.prepend(v538);
            }
          });
        };
        const vO140 = {
          childList: !0,
          subtree: !0
        };
        new MutationObserver((p271, p272) => {
          for (let v539 of p271) {
            if (v539.type === "childList" && v539.addedNodes.length > 0) {
              vF58();
            }
          }
        }).observe(v536, vO140);
        vF58();
      }
      f52();
      let v540 = document.getElementById("filtered-posts-wrap");
      if (!v540) {
        return;
      }
      let vF59 = function (p273) {
        let v541 = p268(p273).find("button.owl-prev");
        let v542 = p268(p273).find("button.owl-next");
        if (v541.length) {
          v541.removeAttr("role");
          v541.attr("aria-label", "Previous Posts");
        }
        if (v542.length) {
          v542.removeAttr("role");
          v542.attr("aria-label", "Next Posts");
        }
      };
      const vO141 = {
        childList: !0,
        subtree: !0
      };
      new MutationObserver(function (p274) {
        for (let v543 of p274) {
          if (v543.type === "childList" && v543.addedNodes.length > 0) {
            v543.addedNodes.forEach(function (p275) {
              if (p275.nodeType === 1) {
                vF59(p275);
              }
            });
          }
        }
      }).observe(v540, vO141);
    });
  })(jQuery);
  function f53() {
    document.querySelectorAll(".comment-content:not(.tags-transformed)").forEach(p276 => {
      let v544 = p276.innerHTML;
      if (v544.includes("[QA]")) {
        let v545 = /\[QA\](.*?)\[OPT\](.*?)\[\/QA\]/g;
        v544 = v544.replace(v545, (p277, p278, p279) => {
          let v546 = p276.closest(".comment");
          let vLSJoinTheDiscussion = "Join the discussion...";
          let vLS18 = "";
          if (v546) {
            vLS18 = "qa-source-" + v546.id;
            v546.setAttribute("data-qa-id", vLS18);
            let v547 = v546.querySelector(".comment-replies");
            if (v547) {
              let v548 = v547.querySelectorAll("li.comment").length;
              if (v548 > 0) {
                let vV548 = v548;
                if (v548 >= 1000) {
                  vV548 = (v548 / 1000).toFixed(1).replace(/\.0$/, "") + "K";
                }
                vLSJoinTheDiscussion = vV548 + " replies and discussion";
              }
            }
          }
          let v549 = p279.split("[OPT]").map(p280 => "<span class=\"qa-option\">" + p280.trim() + "</span>").join("");
          return "<div class=\"qa-card\" data-qa-id=\"" + vLS18 + "\">\n                  <div class=\"qa-title\"><span class=\"qa-icon\">#</span>" + p278.trim() + "</div>\n                  <div class=\"qa-options\">" + v549 + "</div>\n                  <a class=\"qa-footer\" href=\"javascript:void(0)\"><svg class=\"qa-stats-icon\" viewBox=\"0 0 24 24\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\"><g><rect x=\"4\" y=\"10\" width=\"4\" height=\"10\" rx=\"1\"></rect><rect x=\"10\" y=\"4\" width=\"4\" height=\"16\" rx=\"1\"></rect><rect x=\"16\" y=\"6\" width=\"4\" height=\"14\" rx=\"1\"></rect></g></svg><span>" + vLSJoinTheDiscussion + "</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" fill=\"currentColor\" viewBox=\"0 0 16 16\" style=\"margin-left: 4px; font-weight: bold;\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a>\n                </div>";
        });
      }
      let vF60 = (p281, p282) => {
        let v550 = p282.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        v550 = v550.replace(/<br\s*\/?>/gi, "\n");
        let v551 = v550.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        let v552 = "copied-msg-" + Math.random().toString(36).substr(2, 9);
        return "<div class=\"comment-code-wrapper\">\n            <pre><code class=\"hljs\">" + v551 + "</code></pre>\n            <button class=\"copy-code-btn\" title=\"Copy code\" onclick=\"navigator.clipboard.writeText(this.previousElementSibling.querySelector('code').textContent).then(() => { const msg = document.getElementById('" + v552 + "'); msg.classList.add('show'); setTimeout(() => msg.classList.remove('show'), 2000); });\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\"><path d=\"M16.9637 8.98209C16.9613 6.03194 16.9167 4.50384 16.0578 3.45753C14.4008 1.99854 12.7609 1.99854 9.48087 1.99854C6.20089 1.99854 4.5609 1.99854 3.45708 2.90436C1.99799 4.56128 1.99799 6.20116 1.99799 9.48091C1.99799 12.7607 1.99799 14.4005 2.90387 15.5043C4.50346 16.9162 6.03167 16.9608 8.98201 16.9632\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M14.0283 9.02455L16.994 8.98193M14.0143 22.0013L16.9799 21.9586M21.9716 14.0221L21.9436 16.9818M9.01033 14.0357L8.98236 16.9953M11.4873 9.02455C10.6545 9.17371 9.31781 9.32713 9.01033 11.0488M19.4946 21.9586C20.3296 21.8223 21.6685 21.6894 22.0025 19.9726M19.4946 9.02455C20.3274 9.17371 21.6641 9.32713 21.9716 11.0488M11.5 21.9573C10.6672 21.8086 9.33039 21.6559 9.02197 19.9344\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>\n            </button>\n            <span class=\"code-copied-msg\" id=\"" + v552 + "\">Copied!</span>\n          </div>";
      };
      v544 = v544.replace(/\[pre\]([\s\S]*?)\[\/pre\]/g, vF60);
      v544 = v544.replace(/\[code\]([\s\S]*?)\[\/code\]/g, "<code class=\"comment-inline-code hljs\">$1</code>");
      v544 = v544.replace(/\[quote\]([\s\S]*?)\[\/quote\]/g, "<blockquote>$1</blockquote>");
      v544 = v544.replace(/\[tag\]([\s\S]*?)\[\/tag\]/g, "<b class=\"comment-tag\">@$1</b>");
      p276.innerHTML = v544;
      p276.classList.add("tags-transformed");
      if (typeof hljs !== "undefined") {
        p276.querySelectorAll("pre code.hljs").forEach(p283 => {
          hljs.highlightElement(p283);
          if (typeof hljs.lineNumbersBlock == "function") {
            hljs.lineNumbersBlock(p283);
          }
        });
      }
    });
  }
  function f54() {
    if (!document.querySelector(".account-page-container")) {
      return;
    }
    let v553 = (JSON.parse(localStorage.getItem("abefilmUserWatchlist")) || []).length;
    let v554 = (JSON.parse(localStorage.getItem("watchHistoryIDs")) || []).length;
    let v555 = (JSON.parse(localStorage.getItem("abefilm_favorites")) || []).length;
    let v556 = document.querySelector("a[href=\"/p/watchlist.html\"] .item-value");
    let v557 = document.querySelector("a[href=\"/p/history.html\"] .item-value");
    let v558 = document.querySelector("a[href=\"/p/favorite.html\"] .item-value");
    if (v556) {
      if (v553 > 0) {
        v556.textContent = v553;
        v556.classList.add("is-badge");
      } else {
        v556.textContent = "View";
        v556.classList.remove("is-badge");
      }
    }
    if (v557) {
      v557.textContent = v554 > 0 ? v554 : "View";
    }
    if (v558) {
      v558.textContent = v555 > 0 ? v555 : "View";
    }
  }
  document.addEventListener("DOMContentLoaded", function () {
    let v559 = window.innerWidth <= 767;
    let v560 = window.location.pathname.includes("/p/my-account.html");
    let v561 = document.querySelector(".post-page-final-container");
    let vLSAbefilm_simple_user = "abefilm_simple_user";
    let v562 = document.getElementById("theme-icon-source");
    let v563 = v562 ? v562.dataset.guestIcon : "";
    let v564 = v562 ? v562.dataset.userIcon : "";
    let v565 = v562 ? v562.dataset.loggedOutIcon : "";
    let v566 = document.getElementById("generic-modal");
    let v567 = document.getElementById("toastNotification");
    let v568 = document.getElementById("toastMessage");
    function f55(p284) {
      if (!!v567 && !!v568) {
        v568.textContent = p284;
        v567.classList.remove("hidden");
        setTimeout(() => v567.classList.add("show"), 10);
        setTimeout(() => {
          v567.classList.remove("show");
          setTimeout(() => v567.classList.add("hidden"), 500);
        }, 3000);
      }
    }
    if (v566) {
      let v569 = document.getElementById("generic-modal-title");
      let v570 = document.getElementById("generic-modal-message");
      let v571 = document.getElementById("generic-modal-input");
      let v572 = document.getElementById("generic-modal-ok");
      let v573 = document.getElementById("generic-modal-cancel");
      let v574 = null;
      window.hideGenericModal = function () {
        v566.classList.remove("is-visible");
        v574 = null;
      };
      window.showCustomConfirm = function (p285, p286, p287) {
        v569.textContent = p285;
        v570.textContent = p286;
        v571.classList.add("is-hidden");
        v573.style.display = "inline-block";
        v572.textContent = "OK";
        v574 = p287;
        v566.classList.add("is-visible");
      };
      window.showCustomAlert = function (p288, p289) {
        v569.textContent = p288;
        v570.textContent = p289;
        v571.classList.add("is-hidden");
        v573.style.display = "none";
        v572.textContent = "OK";
        v574 = null;
        v566.classList.add("is-visible");
      };
      window.showCustomPrompt = function (p290, p291, p292, p293) {
        v569.textContent = p290;
        v570.textContent = p291;
        v571.value = p292;
        v571.classList.remove("is-hidden");
        v573.style.display = "inline-block";
        v572.textContent = "Save";
        v574 = p293;
        v566.classList.add("is-visible");
        setTimeout(() => v571.focus(), 100);
      };
      v572.addEventListener("click", () => {
        if (typeof v574 == "function") {
          let v575 = v571.value;
          v574(v575);
        }
        hideGenericModal();
      });
      v573.addEventListener("click", hideGenericModal);
      v566.addEventListener("click", p294 => {
        if (p294.target === v566) {
          hideGenericModal();
        }
      });
    }
    if (v561) {
      if (v559) {
        document.body.classList.add("item-view");
        let v576 = document.querySelector(".recommendation-section");
        let v577 = document.querySelector(".abefilm-blog-post-comments");
        let v578 = document.querySelector(".mobile-reaction-title");
        let v579 = document.querySelector(".reaction-container");
        let v580 = document.querySelector(".review-system-container");
        let v581 = document.getElementById("video-tab-content");
        let v582 = document.getElementById("comment-tab-content");
        if (v576 && v581) {
          v581.appendChild(v576);
        }
        if (v582) {
          if (v578) {
            v582.appendChild(v578);
          }
          if (v579) {
            v582.appendChild(v579);
          }
          if (v580) {
            v582.appendChild(v580);
          }
          if (v577) {
            v582.appendChild(v577);
          }
        }
        let v583 = document.querySelectorAll(".mobile-tab-btn");
        let v584 = document.querySelectorAll(".mobile-tab-panel");
        if (v583.length > 0 && v584.length > 0) {
          v583.forEach(function (p295) {
            p295.addEventListener("click", function () {
              let v585 = p295.getAttribute("data-tab-target");
              let v586 = document.querySelector(v585);
              if (v586) {
                v583.forEach(p296 => p296.classList.remove("active"));
                v584.forEach(p297 => p297.classList.remove("active"));
                p295.classList.add("active");
                v586.classList.add("active");
                document.body.classList.toggle("comment-tab-active", v585 === "#comment-tab-content");
              }
            });
          });
        }
      }
      if (v559) {
        let v587 = document.getElementById("mobile-comment-trigger");
        if (v587) {
          let v588 = v587.querySelector(".trigger-discussion-link");
          let v589 = v587.querySelector(".trigger-rating-link");
          let v590 = document.getElementById("close-comment-form");
          if (v588 && v590) {
            v588.addEventListener("click", p298 => {
              p298.preventDefault();
              document.body.classList.add("comment-form-active");
            });
            v590.addEventListener("click", () => {
              document.body.classList.remove("comment-form-active");
            });
          }
          if (v589) {
            v589.addEventListener("click", p299 => {
              p299.preventDefault();
              document.getElementById("review-system")?.scrollIntoView({
                behavior: "smooth",
                block: "center"
              });
            });
          }
        }
      }
      if (v559 && document.body.classList.contains("item-view")) {
        let v591 = document.querySelector(".player-column-final");
        let v592 = document.querySelector(".comment-form");
        if (v591 && v592) {
          let vF61 = function () {
            v592.style.top = v591.offsetHeight + "px";
          };
          var vVF61 = vF61;
          vF61();
          window.addEventListener("resize", vF61);
        }
      }
      if (v559) {
        let v593 = document.querySelector("#celebrity-data");
        let v594 = document.getElementById("video-tab-content");
        if (v593 && v594) {
          let v595 = v593.querySelectorAll("li");
          if (v595.length > 0) {
            let v596 = document.createElement("div");
            v596.className = "section-final mobile-celebrity-section";
            let v597 = document.createElement("h3");
            v597.textContent = "Cast";
            v596.appendChild(v597);
            let v598 = document.createElement("div");
            v598.className = "celebrity-carousel-mobile";
            v595.forEach(p300 => {
              let v599 = p300.querySelector("img")?.src || "";
              let v600 = p300.querySelector("span")?.textContent || "";
              v598.innerHTML += "\n                <div class=\"celebrity-item-mobile\">\n                  <img src=\"" + v599 + "\" alt=\"" + v600 + "\" loading=\"lazy\"/>\n                  <span class=\"name\">" + v600 + "</span>\n                </div>";
            });
            v596.appendChild(v598);
            let v601 = v594.querySelector(".recommendation-section");
            if (v601) {
              v594.insertBefore(v596, v601);
            } else {
              v594.appendChild(v596);
            }
          }
        }
      }
      if (v559) {
        let v602 = document.querySelector("#post-page-sidebar #HTML8");
        let v603 = document.getElementById("video-tab-content");
        if (v602 && v603) {
          let v604 = v603.querySelector(".recommendation-section");
          if (v604) {
            v603.insertBefore(v602, v604);
          } else {
            v603.appendChild(v602);
          }
        }
      }
    }
    let v605 = document.getElementById("comments");
    if (v605) {
      let vF62 = function () {
        let v606 = document.getElementById("top-ce");
        let v607 = document.querySelector(".comments .comment-form");
        if (v606 && v607) {
          v607.appendChild(v606);
          clearInterval(vSetInterval2);
        }
      };
      var vVF62 = vF62;
      let v608 = document.getElementById("comment-helper");
      const vO142 = {
        childList: !0,
        subtree: !0
      };
      if (v608) {
        new MutationObserver(p301 => {
          for (let v609 of p301) {
            for (let v610 of v609.addedNodes) {
              if (v610.nodeType === 1 && v610.id === "comment-editor") {
                if (v610.parentNode) {
                  v610.parentNode.insertBefore(v608, v610);
                }
                return;
              }
            }
          }
        }).observe(v605, vO142);
      }
      let v611 = document.getElementById("sort-select");
      let v612 = document.getElementById("top-ra");
      if (v611 && v612) {
        v611.addEventListener("change", function () {
          v612.style.flexDirection = this.value === "newest" ? "column-reverse" : "column";
        });
      }
      let vSetInterval2 = setInterval(vF62, 100);
      setTimeout(() => {
        clearInterval(vSetInterval2);
      }, 10000);
      let v613 = document.querySelector(".comment-count-badge");
      if (v613) {
        try {
          let vParseInt3 = parseInt(v613.textContent, 10);
          if (!isNaN(vParseInt3)) {
            if (vParseInt3 >= 1000) {
              v613.textContent = (vParseInt3 / 1000).toFixed(1).replace(".0", "") + "k";
            } else if (vParseInt3 === 0) {
              v613.style.display = "none";
            }
          }
        } catch (e11) {
          console.error("Error formatting comment badge:", e11);
        }
      }
    }
    let vLSHttpsagfwyfwsnqnklgc = "https://agfwyfwsnqnklgcgemnw.supabase.co";
    let vLSEyJhbGciOiJIUzI1NiIs = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnZnd5ZndzbnFua2xnY2dlbW53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyMTQ3MTQsImV4cCI6MjA3Mjc5MDcxNH0.NBWiC0YzG8zDhijQ17j49xVXUyLJYXlMJKJkfFJg5yg";
    if (typeof supabase !== "undefined" && vLSHttpsagfwyfwsnqnklgc.startsWith("http")) {
      let v614 = supabase.createClient(vLSHttpsagfwyfwsnqnklgc, vLSEyJhbGciOiJIUzI1NiIs);
      let vF63 = () => {
        let v615 = document.getElementById("post-review-data");
        if (!v615) {
          return;
        }
        if (!document.getElementById("rating-feedback-popup")) {
          let v616 = document.createElement("div");
          v616.id = "rating-feedback-popup";
          v616.className = "rating-feedback-container";
          v616.innerHTML = "<div class=\"feedback-content\"><h3 class=\"popup-text\">You rated</h3><div class=\"popup-stars\" id=\"popup-stars-content\"></div></div>";
          document.body.appendChild(v616);
        }
        let v617 = v615.getAttribute("data-post-id");
        let v618 = "sb_rated_" + v617;
        let v619 = document.getElementById("review-summary-wrapper");
        let v620 = null;
        let v621 = localStorage.getItem("supabase_client_id");
        if (!v621) {
          v621 = self.crypto.randomUUID();
          localStorage.setItem("supabase_client_id", v621);
        }
        let vF64 = p302 => p302 >= 1000 ? (p302 / 1000).toFixed(p302 % 1000 !== 0 ? 1 : 0) + "K" : p302;
        let vF65 = () => {
          let v622 = document.getElementById("rating-shortcut-text");
          if (v622) {
            v622.textContent = localStorage.getItem(v618) !== null ? "My rating" : "Rate now";
          }
        };
        let vF66 = p303 => {
          v620 = p303;
          let v623 = localStorage.getItem(v618);
          let v624 = v623 !== null;
          let v625 = p303?.total_ratings || 0;
          let v626 = p303?.average_rating || 0;
          let v627 = p303?.rating_counts || {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
          };
          let vLS19 = "";
          let vLS20 = "";
          for (let vLN14 = 1; vLN14 <= 5; vLN14++) {
            vLS19 += "<span class=\"star " + (vLN14 <= Math.round(v626) ? "filled" : "") + "\" data-value=\"" + vLN14 + "\">&#9733;</span>";
          }
          for (let vLN52 = 5; vLN52 >= 1; vLN52--) {
            vLS20 += "<div class=\"breakdown-row\"><span>" + vLN52 + ".0</span><div class=\"progress-bar-container\"><div class=\"progress-bar\" style=\"width:" + (v625 > 0 ? (v627[String(vLN52)] || 0) / v625 * 100 : 0) + "%;\"></div></div><span class=\"review-count\">" + (v627[String(vLN52)] || 0) + " reviews</span></div>";
          }
          v619.innerHTML = "<div class=\"review-summary-left\"><div class=\"average-rating-score\">" + v626.toFixed(1) + "</div><div><div class=\"average-rating-stars " + (v624 ? "rated" : "") + "\" id=\"interactive-stars\">" + vLS19 + "</div><div class=\"total-ratings\">" + vF64(v625) + " ratings</div></div></div><div class=\"review-summary-right\">" + vLS20 + "</div>";
          let v628 = document.getElementById("user-rating-display-container");
          if (!v628) {
            v628 = document.createElement("div");
            v628.id = "user-rating-display-container";
            v619.after(v628);
          }
          if (v624) {
            let vParseInt4 = parseInt(v623, 10);
            let vLS21 = "";
            for (let vLN15 = 1; vLN15 <= 5; vLN15++) {
              vLS21 += vLN15 <= vParseInt4 ? "<span class=\"star filled\">&#9733;</span>" : "<span class=\"star\">&#9734;</span>";
            }
            v628.innerHTML = "<div class=\"user-rating-display\"><span>You rated:</span><div>" + vLS21 + "</div></div>";
          } else {
            v628.innerHTML = "";
          }
        };
        let vF67 = async () => {
          let {
            data: _0x109657,
            error: _0x50f0c6
          } = await v614.from("review_summaries").select("*").eq("post_id", v617).single();
          if (_0x50f0c6 && _0x50f0c6.code !== "PGRST116") {
            console.error("Supabase Error:", _0x50f0c6);
          }
          vF66(_0x109657);
          vF65();
        };
        let vF68 = p304 => {
          let v629 = document.getElementById("rating-feedback-popup");
          let v630 = v629.querySelector(".feedback-content");
          let v631 = document.getElementById("popup-stars-content");
          if (!!v629 && !!v631) {
            v630.querySelectorAll(".sparkle").forEach(p305 => p305.remove());
            v631.innerHTML = Array.from({
              length: 5
            }, (p306, p307) => p307 < p304 ? "<span class=\"star-filled\">&#9733;</span>" : "<span class=\"star-empty\">&#9734;</span>").join("");
            for (let vLN018 = 0; vLN018 < 12; vLN018++) {
              let v632 = document.createElement("div");
              v632.className = "sparkle";
              let v633 = Math.random() * 360;
              let v634 = Math.random() * 80 + 60;
              let v635 = Math.cos(v633 * Math.PI / 180) * v634;
              let v636 = Math.sin(v633 * Math.PI / 180) * v634;
              v632.style.setProperty("--sparkle-transform-end", "translate(" + v635 + "px, " + v636 + "px)");
              v632.style.animationDelay = Math.random() * 0.3 + "s";
              v630.appendChild(v632);
            }
            v629.classList.add("show");
            setTimeout(() => v629.classList.remove("show"), 2500);
          }
        };
        let vF69 = async p308 => {
          if (localStorage.getItem(v618) !== null) {
            return;
          }
          vF68(p308);
          localStorage.setItem(v618, p308);
          vF65();
          let v637 = v620?.total_ratings || 0;
          let v638 = (v620?.average_rating || 0) * v637;
          let v639 = v620?.rating_counts || {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0
          };
          vF66({
            total_ratings: v637 + 1,
            average_rating: (v638 + p308) / (v637 + 1),
            rating_counts: {
              ...v639,
              [String(p308)]: (v639[String(p308)] || 0) + 1
            }
          });
          const vO146 = {
            post_id: v617,
            rating: p308,
            client_id: v621
          };
          let {
            error: _0x17d1a9
          } = await v614.from("reviews").insert(vO146);
          if (_0x17d1a9) {
            console.error("Error submitting review:", _0x17d1a9);
            localStorage.removeItem(v618);
            vF67();
          }
        };
        v619.addEventListener("click", p309 => {
          let v640 = p309.target.closest(".star");
          let v641 = p309.target.closest(".average-rating-stars");
          if (v640 && v641 && !v641.classList.contains("rated")) {
            vF69(parseInt(v640.getAttribute("data-value")));
          }
        });
        vF67();
      };
      let vF70 = () => {
        let v642 = document.getElementById("post-review-data") || document.getElementById("post-id");
        let v643 = document.getElementById("reaction-container");
        if (!v642 || !v643) {
          return;
        }
        let v644 = v642.getAttribute("data-post-id");
        if (!v644) {
          console.error("Reaction system: Post ID not found.");
          return;
        }
        let v645 = "sb_reacted_" + v644;
        let vA13 = [{
          type: "like",
          label: "Upvote",
          icon: "👍"
        }, {
          type: "love",
          label: "Love",
          icon: "😍"
        }, {
          type: "haha",
          label: "Funny",
          icon: "😆"
        }, {
          type: "wow",
          label: "Surprised",
          icon: "😲"
        }, {
          type: "sad",
          label: "Sad",
          icon: "😢"
        }, {
          type: "angry",
          label: "Angry",
          icon: "😤"
        }];
        let v646 = localStorage.getItem("supabase_client_id");
        if (!v646) {
          v646 = self.crypto.randomUUID();
          localStorage.setItem("supabase_client_id", v646);
        }
        let vO153 = {};
        let v647 = null;
        let vF71 = (p310, p311) => {
          v643.innerHTML = vA13.map(p312 => {
            let v648 = p310?.[p312.type] || 0;
            return "<button class=\"reaction-btn " + (p311 === p312.type ? "selected" : "") + "\" data-reaction=\"" + p312.type + "\"><div class=\"reaction-icon-wrapper\"><span class=\"reaction-icon\">" + p312.icon + "</span><span class=\"reaction-count\">" + (v648 > 0 ? v648 : "") + "</span></div><span class=\"reaction-label\">" + p312.label + "</span></button>";
          }).join("");
        };
        let vF72 = async () => {
          try {
            let [v649, v650] = await Promise.all([v614.from("reaction_summaries").select("counts").eq("post_id", v644).single(), v614.from("reactions").select("reaction_type").eq("post_id", v644).eq("client_id", v646).single()]);
            vO153 = v649.data?.counts || {};
            v647 = v650.data?.reaction_type || null;
            if (v647) {
              localStorage.setItem(v645, v647);
            } else {
              localStorage.removeItem(v645);
            }
            vF71(vO153, v647);
          } catch (e12) {
            console.error("Error fetching reaction data:", e12);
          }
        };
        let vF73 = async p313 => {
          let vV647 = v647;
          if (vV647 === p313) {
            if (vO153[vV647]) {
              vO153[vV647]--;
            }
            v647 = null;
            localStorage.removeItem(v645);
          } else {
            if (vV647 && vO153[vV647]) {
              vO153[vV647]--;
            }
            vO153[p313] = (vO153[p313] || 0) + 1;
            v647 = p313;
            localStorage.setItem(v645, p313);
          }
          vF71(vO153, v647);
          try {
            const vO154 = {
              post_id: v644,
              client_id: v646
            };
            if (vV647 === p313) {
              await v614.from("reactions").delete().match(vO154);
            } else {
              await v614.from("reactions").upsert({
                post_id: v644,
                client_id: v646,
                reaction_type: p313
              }, {
                onConflict: "post_id, client_id"
              });
            }
          } catch (e13) {
            console.error("Error updating reaction:", e13);
            await vF72();
          }
        };
        v643.addEventListener("click", p314 => {
          let v651 = p314.target.closest(".reaction-btn");
          if (v651) {
            vF73(v651.dataset.reaction);
          }
        });
        vF72();
      };
      vF63();
      vF70();
    } else {
      console.warn("Supabase client not loaded or configured. Interactive features will be disabled.");
    }
    let v652 = document.getElementById("watchlist-container");
    if (v652) {
      let vF74 = function (p315) {
        v655.innerHTML = "";
        let v653 = document.querySelector(".sidebar-logo .logo-text")?.textContent.trim() || "";
        for (let vLN019 = 0; vLN019 < p315; vLN019++) {
          v655.innerHTML += "<div class=\"skeleton-grid-item\"><div class=\"skeleton-poster\">" + v653 + "</div><div class=\"skeleton-info\"><div class=\"skeleton-line title\"></div><div class=\"skeleton-line type\"></div></div></div>";
        }
        v655.style.display = "grid";
        v656.style.display = "none";
      };
      let vF75 = function (p316, p317) {
        if (v661) {
          if (v662.has(p316)) {
            v662.delete(p316);
            p317.classList.remove("selected");
          } else {
            v662.add(p316);
            p317.classList.add("selected");
          }
          vF77();
        }
      };
      let vF76 = function (p318) {
        v661 = p318 !== undefined ? p318 : !v661;
        v652.classList.toggle("edit-mode", v661);
        v662.clear();
        v660.checked = false;
        f56();
      };
      let vF77 = function () {
        v659.disabled = v662.size === 0;
        v659.style.opacity = v662.size === 0 ? 0.5 : 1;
        let v654 = document.querySelectorAll(".watchlist-item");
        v660.checked = v654.length > 0 && v662.size === v654.length;
      };
      var vVF82 = vF74;
      var vVF83 = vF75;
      var vVF84 = vF76;
      var vVF85 = vF77;
      let vLSAbefilmUserWatchlist2 = "abefilmUserWatchlist";
      let v655 = v652.querySelector("#watchlist-grid");
      let v656 = v652.querySelector("#watchlist-empty-state");
      let v657 = v652.querySelector("#edit-watchlist-btn");
      let v658 = v652.querySelector("#cancel-edit-btn");
      let v659 = v652.querySelector("#delete-selected-btn");
      let v660 = v652.querySelector("#select-all-checkbox");
      let v661 = !1;
      let v662 = new Set();
      async function f56() {
        let vA14 = [];
        try {
          vA14 = JSON.parse(localStorage.getItem(vLSAbefilmUserWatchlist2)) || [];
        } catch {}
        if (vA14.length === 0) {
          v656.style.display = "flex";
          v655.style.display = "none";
          v652.classList.remove("has-content");
          vF76(false);
          v657.style.display = "none";
        } else {
          v656.style.display = "none";
          v652.classList.add("has-content");
          vF74(vA14.length);
          v657.style.display = "block";
        }
        let v663 = vA14.map(p319 => fetch(p319.url).then(p320 => p320.ok ? p320.text() : null).then(p321 => {
          if (!p321) {
            return p319;
          }
          let v664 = new DOMParser().parseFromString(p321, "text/html");
          let v665 = v664.querySelector("img[alt=\"poster\"]")?.src;
          let v666 = v664.querySelector("#extra-meta .meta-type")?.textContent.trim();
          return {
            ...p319,
            poster: v665 || p319.image,
            type: v666 || "Movie"
          };
        }).catch(() => p319));
        let v667 = await Promise.all(v663);
        if (vA14.length > 0) {
          v655.innerHTML = "";
          v667.forEach(p322 => {
            let v668 = document.createElement("div");
            v668.className = "watchlist-item grid-item";
            v668.dataset.id = p322.id;
            v668.innerHTML = "<a href=\"" + (v661 ? "javascript:void(0);" : p322.url || "#") + "\" class=\"poster-wrapper\" title=\"" + p322.title + "\"><img src=\"" + p322.poster + "\" alt=\"" + p322.title + "\" class=\"poster\"><div class=\"play-icon-overlay\"><svg class=\"play-button\" viewBox=\"0 0 60 60\"><g fill=\"none\"><circle fill=\"var(--keycolor)\" cx=\"30\" cy=\"30\" r=\"30\"></circle><path d=\"M35.75,22.5 L45.14,36.58 C46.06,37.96 45.69,39.83 44.31,40.75 C43.82,41.07 43.24,41.25 42.64,41.25 L23.86,41.25 C22.20,41.25 20.86,39.91 20.86,38.25 C20.86,37.66 21.03,37.08 21.36,36.59 L30.75,22.5 C31.67,21.12 33.54,20.74 34.91,21.66 C35.24,21.88 35.53,22.16 35.75,22.5 Z\" fill=\"#FFFFFF\" transform=\"translate(33.25, 30) rotate(-270) translate(-33.25, -30)\"></path></g></svg></div><div class=\"selection-overlay\"><div class=\"checkmark\"><i class=\"fas fa-check\"></i></div></div></a><div class=\"item-info\"><div class=\"title\">" + p322.title + "</div><p class=\"type\">" + p322.type + "</p></div>";
            v655.appendChild(v668);
            v668.querySelector(".poster-wrapper").addEventListener("click", p323 => {
              if (v661) {
                p323.preventDefault();
                vF75(p322.id, v668);
              }
            });
          });
        }
        vF77();
      }
      v657.addEventListener("click", () => vF76(!0));
      v658.addEventListener("click", () => vF76(!1));
      v660.addEventListener("change", () => {
        let v669 = v660.checked;
        document.querySelectorAll(".watchlist-item").forEach(p324 => {
          let v670 = p324.dataset.id;
          let v671 = v662.has(v670);
          if (v669 && !v671) {
            v662.add(v670);
            p324.classList.add("selected");
          } else if (!v669 && v671) {
            v662.delete(v670);
            p324.classList.remove("selected");
          }
        });
        vF77();
      });
      v659.addEventListener("click", () => {
        if (v662.size !== 0) {
          showCustomConfirm("Delete Items", "Are you sure you want to delete " + v662.size + " selected item(s)?", () => {
            let v672 = (JSON.parse(localStorage.getItem(vLSAbefilmUserWatchlist2)) || []).filter(p325 => !v662.has(p325.id));
            localStorage.setItem(vLSAbefilmUserWatchlist2, JSON.stringify(v672));
            if (typeof window.renderWatchlistPanel == "function") {
              window.renderWatchlistPanel();
            }
            if (typeof window.updateWatchlistBadge == "function") {
              window.updateWatchlistBadge();
            }
            vF76(false);
          });
        }
      });
      f56();
      window.addEventListener("storage", p326 => {
        if (p326.key === vLSAbefilmUserWatchlist2) {
          f56();
        }
      });
    }
    let v673 = document.getElementById("history-container");
    if (v673) {
      let vF78 = function (p327) {
        v676.innerHTML = "";
        let v674 = document.querySelector(".sidebar-logo .logo-text")?.textContent.trim() || "";
        for (let vLN020 = 0; vLN020 < p327; vLN020++) {
          v676.innerHTML += "<div class=\"skeleton-grid-item\"><div class=\"skeleton-poster\">" + v674 + "</div><div class=\"skeleton-info\"><div class=\"skeleton-line title\"></div><div class=\"skeleton-line type\"></div></div></div>";
        }
        v676.style.display = "grid";
        v677.style.display = "none";
      };
      let vF79 = function (p328, p329) {
        if (v682) {
          if (v683.has(String(p328))) {
            v683.delete(String(p328));
            p329.classList.remove("selected");
          } else {
            v683.add(String(p328));
            p329.classList.add("selected");
          }
          vF81();
        }
      };
      let vF80 = function (p330) {
        v682 = p330 !== undefined ? p330 : !v682;
        v673.classList.toggle("edit-mode", v682);
        v683.clear();
        v681.checked = !1;
        f57();
      };
      let vF81 = function () {
        v680.disabled = v683.size === 0;
        v680.style.opacity = v683.size === 0 ? 0.5 : 1;
        let v675 = document.querySelectorAll(".history-item");
        v681.checked = v675.length > 0 && v683.size === v675.length;
      };
      var vVF82 = vF78;
      var vVF83 = vF79;
      var vVF84 = vF80;
      var vVF85 = vF81;
      let vLSWatchHistoryIDs = "watchHistoryIDs";
      let vLSAbefilmWatchProgress = "abefilmWatchProgress";
      let v676 = v673.querySelector("#history-grid");
      let v677 = v673.querySelector("#history-empty-state");
      let v678 = v673.querySelector("#edit-history-btn");
      let v679 = v673.querySelector("#cancel-edit-btn");
      let v680 = v673.querySelector("#delete-selected-btn");
      let v681 = v673.querySelector("#select-all-checkbox");
      let v682 = !1;
      let v683 = new Set();
      async function f57() {
        let vA15 = [];
        try {
          vA15 = JSON.parse(localStorage.getItem(vLSWatchHistoryIDs)) || [];
        } catch {}
        let v684 = JSON.parse(localStorage.getItem(vLSAbefilmWatchProgress) || "{}");
        if (vA15.length === 0) {
          v677.style.display = "flex";
          v676.style.display = "none";
          v673.classList.remove("has-content");
          vF80(false);
          v678.style.display = "none";
        } else {
          v677.style.display = "none";
          v673.classList.add("has-content");
          vF78(vA15.length);
          v678.style.display = "block";
        }
        let v685 = vA15.map(p331 => fetch("/feeds/posts/default/" + p331 + "?alt=json").then(p332 => p332.ok ? p332.json() : null).then(p333 => {
          if (!p333 || !p333.entry) {
            return null;
          }
          let v686 = p333.entry;
          let v687 = document.createElement("div");
          v687.innerHTML = v686.content.$t;
          let v688 = v687.querySelector("span.slider-backdrop")?.textContent.trim();
          let v689 = v687.querySelector("img[alt=\"poster\"]")?.src;
          let v690 = v687.querySelector("#extra-meta .meta-type")?.textContent.trim();
          let v691 = v687.querySelector("#episodes-data ul[data-server-name]");
          let v692 = v691 ? v691.querySelectorAll("a").length : 0;
          let v693 = v684["post-" + p331] || 0;
          let vLN021 = 0;
          if (v692 > 1) {
            vLN021 = (v693 + 1) / v692 * 100;
          } else if (v692 === 1 || v692 === 0 && v690 !== "TV Series") {
            vLN021 = 100;
          }
          return {
            id: p331,
            url: v686.link.find(p334 => p334.rel === "alternate").href,
            title: v686.title.$t,
            image: v688 || v689,
            type: v690 || "Movie",
            progressPercent: vLN021
          };
        }).catch(() => null));
        let v694 = (await Promise.all(v685)).filter(Boolean);
        if (v694.length > 0) {
          v676.innerHTML = "";
          v694.forEach(p335 => {
            let v695 = document.createElement("div");
            v695.className = "history-item grid-item";
            v695.dataset.id = p335.id;
            v695.innerHTML = "<a href=\"" + (v682 ? "javascript:void(0);" : p335.url || "#") + "\" class=\"poster-wrapper\"><img src=\"" + p335.image + "\" alt=\"" + p335.title + "\" class=\"poster\"><div class=\"play-icon-overlay\"><svg class=\"play-button\" viewBox=\"0 0 60 60\"><g fill=\"none\"><circle fill=\"var(--keycolor)\" cx=\"30\" cy=\"30\" r=\"30\"></circle><path d=\"M35.75,22.5 L45.14,36.58 C46.06,37.96 45.69,39.83 44.31,40.75 C43.82,41.07 43.24,41.25 42.64,41.25 L23.86,41.25 C22.20,41.25 20.86,39.91 20.86,38.25 C20.86,37.66 21.03,37.08 21.36,36.59 L30.75,22.5 C31.67,21.12 33.54,20.74 34.91,21.66 C35.24,21.88 35.53,22.16 35.75,22.5 Z\" fill=\"#FFFFFF\" transform=\"translate(33.25, 30) rotate(-270) translate(-33.25, -30)\"></path></g></svg></div><div class=\"selection-overlay\"><div class=\"checkmark\"></div></div><div class=\"progress-bar-overlay\"><div class=\"progress-bar-fill\" style=\"width: " + p335.progressPercent + "%;\"></div></div></a><div class=\"item-info\"><div class=\"title\">" + p335.title + "</div><p class=\"type\">" + p335.type + "</p></div>";
            v676.appendChild(v695);
            v695.querySelector(".poster-wrapper").addEventListener("click", p336 => {
              if (v682) {
                p336.preventDefault();
                vF79(p335.id, v695);
              }
            });
          });
        }
        vF81();
      }
      v678.addEventListener("click", () => vF80(!0));
      v679.addEventListener("click", () => vF80(!1));
      v681.addEventListener("change", () => {
        let v696 = document.querySelectorAll(".history-item");
        if (v681.checked) {
          v696.forEach(p337 => {
            if (!p337.classList.contains("selected")) {
              vF79(p337.dataset.id, p337);
            }
          });
        } else {
          v696.forEach(p338 => {
            if (p338.classList.contains("selected")) {
              vF79(p338.dataset.id, p338);
            }
          });
        }
      });
      v680.addEventListener("click", () => {
        if (v683.size !== 0) {
          showCustomConfirm("Delete History", "Are you sure you want to delete " + v683.size + " selected item(s) from your history?", () => {
            let v697 = (JSON.parse(localStorage.getItem(vLSWatchHistoryIDs)) || []).filter(p339 => !v683.has(String(p339)));
            localStorage.setItem(vLSWatchHistoryIDs, JSON.stringify(v697));
            if (typeof window.displayHistory == "function") {
              window.displayHistory();
            }
            if (typeof window.updateHistoryBadge == "function") {
              window.updateHistoryBadge();
            }
            vF80(false);
          });
        }
      });
      f57();
      window.addEventListener("storage", p340 => {
        if (p340.key === vLSWatchHistoryIDs) {
          f57();
        }
      });
    }
    let v698 = document.getElementById("favorites-container");
    if (v698) {
      let vF82 = function (p341) {
        v701.innerHTML = "";
        for (let vLN022 = 0; vLN022 < p341; vLN022++) {
          v701.innerHTML += "<div class=\"skeleton-list-item\"><div class=\"skeleton-poster\"></div><div class=\"skeleton-details\"><div class=\"skeleton-line title\"></div><div class=\"skeleton-line meta\"></div><div class=\"skeleton-line text\"></div><div class=\"skeleton-line text short\"></div><div class=\"skeleton-line button\"></div></div></div>";
        }
        v701.style.display = "grid";
        v702.style.display = "none";
      };
      let vF83 = function (p342, p343, p344) {
        if (v707) {
          if (p344) {
            v708.add(String(p342));
            p343.classList.add("selected");
          } else {
            v708.delete(String(p342));
            p343.classList.remove("selected");
          }
          vF85();
        }
      };
      let vF84 = function (p345) {
        v707 = p345 !== undefined ? p345 : !v707;
        v698.classList.toggle("edit-mode", v707);
        if (!v707) {
          v708.clear();
          if (v706) {
            v706.checked = false;
          }
          document.querySelectorAll(".favorite-item.selected").forEach(p346 => {
            p346.classList.remove("selected");
            let v699 = p346.querySelector(".item-checkbox");
            if (v699) {
              v699.checked = false;
            }
          });
        }
        vF85();
      };
      let vF85 = function () {
        if (!v705) {
          return;
        }
        v705.disabled = v708.size === 0;
        v705.style.opacity = v708.size === 0 ? 0.5 : 1;
        let v700 = document.querySelectorAll(".favorite-item");
        if (v706) {
          v706.checked = v700.length > 0 && v708.size === v700.length;
        }
      };
      var vVF82 = vF82;
      var vVF83 = vF83;
      var vVF84 = vF84;
      var vVF85 = vF85;
      let vLSAbefilm_favorites2 = "abefilm_favorites";
      let v701 = v698.querySelector("#favorites-list");
      let v702 = v698.querySelector("#favorites-empty-state");
      let v703 = v698.querySelector("#edit-favorites-btn");
      let v704 = v698.querySelector("#cancel-edit-btn");
      let v705 = v698.querySelector("#delete-selected-btn");
      let v706 = v698.querySelector("#select-all-checkbox");
      let v707 = !1;
      let v708 = new Set();
      async function f58() {
        let vA16 = [];
        try {
          vA16 = JSON.parse(localStorage.getItem(vLSAbefilm_favorites2)) || [];
        } catch {}
        if (vA16.length === 0) {
          v702.style.display = "flex";
          v701.style.display = "none";
          v698.classList.remove("has-content");
          vF84(false);
          if (v703) {
            v703.style.display = "none";
          }
        } else {
          v702.style.display = "none";
          v698.classList.add("has-content");
          vF82(vA16.length);
          if (v703) {
            v703.style.display = "block";
          }
        }
        let v709 = vA16.map(p347 => fetch("/feeds/posts/default/" + p347 + "?alt=json").then(p348 => p348.ok ? p348.json() : null).then(p349 => {
          if (!p349 || !p349.entry) {
            return null;
          }
          let v710 = p349.entry;
          let v711 = document.createElement("div");
          v711.innerHTML = v710.content.$t;
          let v712 = v711.querySelector("img[alt=\"poster\"]")?.src;
          let v713 = v711.querySelector("#extra-meta .meta-type")?.textContent.trim();
          let v714 = v711.querySelector("#extra-meta .meta-year")?.textContent.trim();
          let v715 = v711.querySelector("#extra-meta .meta-rating")?.textContent.trim();
          let v716 = v711.querySelector("#overview-data")?.textContent.trim();
          return {
            id: p347,
            url: v710.link.find(p350 => p350.rel === "alternate").href,
            title: v710.title.$t,
            poster: v712,
            type: v713,
            year: v714,
            rating: v715,
            synopsis: v716
          };
        }).catch(() => null));
        let v717 = (await Promise.all(v709)).filter(Boolean);
        if (v717.length > 0) {
          v701.innerHTML = "";
          v717.forEach(p351 => {
            let v718 = document.createElement("div");
            v718.className = "favorite-item";
            v718.dataset.id = p351.id;
            v718.innerHTML = "<a href=\"" + p351.url + "\" class=\"item-poster-link\"><img src=\"" + p351.poster + "\" alt=\"" + p351.title + "\"></a><div class=\"item-details\"><div class=\"title-wrapper\"><h3 class=\"title\">" + p351.title + "</h3><label class=\"selection-checkbox-wrapper\"><input type=\"checkbox\" class=\"item-checkbox\" data-id=\"" + p351.id + "\"><span class=\"custom-checkbox\"></span></label></div><div class=\"item-meta\">" + (p351.rating ? "<span class=\"rating\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\" style=\"vertical-align: text-bottom;\"><path d=\"M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z\"/></svg> " + p351.rating + "</span>" : "") + (p351.year ? "<span>" + p351.year + "</span>" : "") + (p351.type ? "<span>" + p351.type + "</span>" : "") + "</div><p class=\"item-synopsis\">" + (p351.synopsis || "") + "</p><div class=\"item-actions\"><a href=\"" + p351.url + "\" class=\"btn play-btn\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" viewBox=\"0 0 16 16\" style=\"vertical-align: -2px;\"><path d=\"M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z\"/></svg> Play</a></div></div>";
            v701.appendChild(v718);
            let v719 = v718.querySelector(".item-checkbox");
            v718.addEventListener("click", p352 => {
              if (v707) {
                if (!p352.target.closest("a")) {
                  p352.preventDefault();
                  v719.checked = !v719.checked;
                  v719.dispatchEvent(new Event("change"));
                }
              } else if (!p352.target.closest("a")) {
                window.location.href = p351.url;
              }
            });
            v719.addEventListener("change", () => {
              vF83(p351.id, v718, v719.checked);
            });
          });
        }
        vF85();
      }
      if (v703) {
        v703.addEventListener("click", () => vF84(true));
      }
      if (v704) {
        v704.addEventListener("click", () => vF84(false));
      }
      if (v706) {
        v706.addEventListener("change", () => {
          let v720 = v706.checked;
          document.querySelectorAll(".item-checkbox").forEach(p353 => {
            if (p353.checked !== v720) {
              p353.checked = v720;
              p353.dispatchEvent(new Event("change"));
            }
          });
        });
      }
      if (v705) {
        v705.addEventListener("click", () => {
          if (v708.size !== 0) {
            showCustomConfirm("Delete Favorites", "Are you sure you want to delete " + v708.size + " selected item(s)?", () => {
              let v721 = (JSON.parse(localStorage.getItem(vLSAbefilm_favorites2)) || []).filter(p354 => !v708.has(String(p354)));
              localStorage.setItem(vLSAbefilm_favorites2, JSON.stringify(v721));
              vF84(false);
              f58();
            });
          }
        });
      }
      f58();
      window.addEventListener("storage", p355 => {
        if (p355.key === vLSAbefilm_favorites2) {
          f58();
        }
      });
    }
    if (v560) {
      let v722 = document.getElementById("my-account-app");
      if (v722) {
        let vF86 = function () {
          let vLN023 = 0;
          for (let v723 in localStorage) {
            if (localStorage.hasOwnProperty(v723)) {
              vLN023 += (localStorage[v723].length + v723.length) * 2;
            }
          }
          for (let v724 in sessionStorage) {
            if (sessionStorage.hasOwnProperty(v724)) {
              vLN023 += (sessionStorage[v724].length + v724.length) * 2;
            }
          }
          if (vLN023 < 1024) {
            return "0 KB";
          } else if (vLN023 < 1048576) {
            return (vLN023 / 1024).toFixed(2) + " KB";
          } else {
            return (vLN023 / 1048576).toFixed(2) + " MB";
          }
        };
        let vF87 = function () {
          let vVF86 = vF86();
          let v725 = document.querySelector("#clear-cache-btn span");
          if (v725) {
            v725.textContent = vVF86;
          }
        };
        let vF88 = function () {
          let v726 = JSON.parse(localStorage.getItem(vLSAbefilm_simple_user));
          let v727 = document.querySelector(".account-profile-section");
          if (v726 && v726.name) {
            v727.classList.remove("is-logged-out");
            let v728 = !!v726.isGuest;
            let v729 = v728 ? v563 : v726.avatar || v564;
            v746.src = v729;
            v747.innerHTML = v726.name;
            v748.textContent = v726.name;
            v749.src = v729;
            v750.style.display = "block";
            v751.style.display = "flex";
            v752.style.display = "flex";
            v753.style.display = "flex";
            v754.style.display = "block";
            let v730 = document.querySelector("#edit-username-btn svg");
            let v731 = document.querySelector("#edit-avatar-btn svg");
            v755.style.cursor = v728 ? "default" : "pointer";
            v758.style.cursor = v728 ? "default" : "pointer";
            if (v730) {
              v730.style.display = v728 ? "none" : "inline-block";
            }
            if (v731) {
              v731.style.display = v728 ? "none" : "inline-block";
            }
            if (v727.tagName.toLowerCase() !== "a" || !v727.href.includes("/p/my-account.html")) {
              let v732 = document.createElement("a");
              v732.href = "/p/my-account.html";
              v732.className = v727.className;
              while (v727.firstChild) {
                v732.appendChild(v727.firstChild);
              }
              v727.parentNode.replaceChild(v732, v727);
            }
          } else {
            v727.classList.add("is-logged-out");
            v746.src = v565;
            v747.innerHTML = "Login <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\" style=\"width: 0.8em; height: 0.8em; vertical-align: middle; margin-left: 4px;\"><path d=\"M9 18l6-6-6-6\"/></svg>";
            v748.textContent = "Not logged in";
            v750.style.display = "block";
            v751.style.display = "flex";
            v752.style.display = "none";
            v754.style.display = "none";
            v753.style.display = "none";
            if (v727.tagName.toLowerCase() !== "a" || v727.id !== "showLoginModalBtn") {
              let v733 = document.createElement("a");
              v733.href = "#";
              v733.id = "showLoginModalBtn";
              v733.className = v727.className;
              while (v727.firstChild) {
                v733.appendChild(v727.firstChild);
              }
              v727.parentNode.replaceChild(v733, v727);
            }
          }
          let vO155 = {
            watchlist: (JSON.parse(localStorage.getItem("abefilmUserWatchlist")) || []).length,
            history: (JSON.parse(localStorage.getItem("watchHistoryIDs")) || []).length,
            favorite: (JSON.parse(localStorage.getItem("abefilm_favorites")) || []).length
          };
          for (let v734 in vO155) {
            let v735 = vO155[v734];
            let v736 = document.querySelector(".item-count[data-count-for=\"" + v734 + "\"]");
            if (v736) {
              if (v735 > 0) {
                v736.textContent = v735;
                v736.style.display = "inline-block";
              } else {
                v736.style.display = "none";
              }
            }
          }
          vF87();
        };
        let vF89 = function () {
          let v737 = document.getElementById("avatar-data-source");
          if (!v737) {
            return;
          }
          let v738 = Array.from(v737.children).map(p356 => ({
            name: p356.dataset.name,
            avatars: Array.from(p356.querySelectorAll("img")).map(p357 => p357.src)
          }));
          v761.innerHTML = "";
          v738.forEach((p358, p359) => {
            let v739 = document.createElement("button");
            v739.className = "avatar-category-tab";
            v739.textContent = p358.name;
            v739.addEventListener("click", () => vF90(p359, v738));
            v761.appendChild(v739);
          });
          if (v738.length > 0) {
            vF90(0, v738);
          }
        };
        let vF90 = function (p360, p361) {
          v762.innerHTML = "";
          let v740 = p361[p360];
          if (v740) {
            v740.avatars.forEach(p362 => {
              let v741 = document.createElement("div");
              v741.className = "avatar-choice";
              v741.innerHTML = "<img src=\"" + p362 + "\" alt=\"Avatar\">";
              v741.addEventListener("click", () => vF91(p362));
              v762.appendChild(v741);
            });
            document.querySelectorAll(".avatar-category-tab").forEach((p363, p364) => p363.classList.toggle("active", p364 === p360));
          }
        };
        let vF91 = function (p365) {
          let v742 = JSON.parse(localStorage.getItem(vLSAbefilm_simple_user));
          if (v742 && !v742.isGuest) {
            v742.avatar = p365;
            localStorage.setItem(vLSAbefilm_simple_user, JSON.stringify(v742));
            sessionStorage.setItem("showToastAfterReload", "Avatar updated successfully.");
            location.reload();
          }
        };
        let vF92 = function () {
          v759.classList.add("is-visible");
        };
        let vF93 = function () {
          v759.classList.remove("is-visible");
        };
        var vVF862 = vF86;
        var vVF87 = vF87;
        var vVF88 = vF88;
        var vVF89 = vF89;
        var vVF90 = vF90;
        var vVF91 = vF91;
        var vVF92 = vF92;
        var vVF93 = vF93;
        let v743 = document.getElementById("community-section-source");
        let vLSdivClassaccountpagec = "<div class=\"account-page-container\"><div class=\"account-profile-section\"><div class=\"account-profile-avatar-wrapper\"><img id=\"account-page-avatar-img\" src=\"\" alt=\"User Avatar\" /></div><div class=\"account-profile-info\"><h2 id=\"account-page-name\" class=\"account-profile-name\"></h2></div></div><div class=\"account-list-section\" id=\"account-section-header\"><h3 class=\"section-header\">Account</h3><div class=\"account-list-item\" id=\"username-list-item\"><span class=\"item-label\"><svg fill=\"#fff\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><path id=\"secondary\" d=\"M3.29,16.09,8.2,21H11V18.2L6.09,13.29a1,1,0,0,0-1.4,0l-1.4,1.4A1,1,0,0,0,3.29,16.09Z\" style=\"fill: none; stroke: var(--keycolor); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path><path id=\"primary\" d=\"M13,13h1a7,7,0,0,1,7,7,1,1,0,0,1-1,1H15\" style=\"fill: none; stroke: #fff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path><circle id=\"primary-2\" data-name=\"primary\" cx=\"13\" cy=\"8\" r=\"5\" style=\"fill: none; stroke: #fff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></circle></g></svg> Username</span><a href=\"javascript:void(0)\" class=\"item-action\" id=\"edit-username-btn\"><span id=\"account-page-username-value\" class=\"item-value\"></span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a></div><div class=\"account-list-item\" id=\"avatar-list-item\"><span class=\"item-label\"><svg fill=\"#fff\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><path id=\"secondary\" d=\"M13,7.13A3.66,3.66,0,0,0,12,7a4,4,0,1,0,3.46,6\" style=\"fill: none; stroke: var(--keycolor); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path><path id=\"secondary-2\" data-name=\"secondary\" d=\"M12,15a5,5,0,0,0-5,4.5,9,9,0,0,0,9.94,0A5,5,0,0,0,12,15Zm5-6h4M19,7v4\" style=\"fill: none; stroke: var(--keycolor); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path><path id=\"primary\" d=\"M20.48,15a8.86,8.86,0,0,1-2.12,3.36A9,9,0,1,1,16,3.94\" style=\"fill: none; stroke: #fff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path></g></svg> Avatar</span><a href=\"javascript:void(0)\" class=\"item-action avatar-action\" id=\"edit-avatar-btn\"><div class=\"item-avatar-preview\"><img id=\"account-page-avatar-preview-img\" src=\"\" alt=\"Current Avatar\" /></div><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a></div></div><div class=\"account-list-section\" id=\"my-content-section\"><h3 class=\"section-header\">My Content</h3><div class=\"account-list-item\"><div class=\"item-label-group\"><span class=\"item-label\"><svg fill=\"#fff\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><polygon id=\"secondary\" points=\"5.76 16.3 3 16.67 5 18.47 4.53 21 7 19.8 9.47 21 9 18.47 11 16.67 8.24 16.3 7 14 5.76 16.3\" style=\"fill: none; stroke: var(--keycolor); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></polygon><path id=\"primary\" d=\"M7,10V4A1,1,0,0,1,8,3h9l4,4V20a1,1,0,0,1-1,1H14\" style=\"fill: none; stroke: #fff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path></g></svg> Watchlist</span><span class=\"item-count\" data-count-for=\"watchlist\"></span></div><a href=\"/p/watchlist.html\" class=\"item-action\"><span>View All</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a></div><div class=\"account-list-item\"><div class=\"item-label-group\"><span class=\"item-label\"><svg fill=\"#ffffff\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><polyline id=\"secondary\" points=\"8 12 12 12 12 7\" style=\"fill: none; stroke: var(--keycolor); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></polyline><path id=\"primary\" d=\"M12,3a9,9,0,1,1-9,9\" style=\"fill: none; stroke: #fff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path></g></svg> Watch History</span><span class=\"item-count\" data-count-for=\"history\"></span></div><a href=\"/p/history.html\" class=\"item-action\"><span>View All</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a></div><div class=\"account-list-item\"><div class=\"item-label-group\"><span class=\"item-label\"><svg fill=\"#fff\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><path id=\"secondary\" d=\"M16.84,13.72l-.34.34-.34-.34a2.43,2.43,0,0,0-3.45,0,2.47,2.47,0,0,0,0,3.47l1,1L16.5,21l2.75-2.77,1-1a2.47,2.47,0,0,0,0,3.47A2.43,2.43,0,0,0,16.84,13.72Z\" style=\"fill: none; stroke: var(--keycolor); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path><path id=\"primary\" d=\"M10,20H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3h8.59a1,1,0,0,1,.7.29l3.42,3.42a1,1,0,0,1,.29.7V9\" style=\"fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path></g></svg> Favorite</span><span class=\"item-count\" data-count-for=\"favorite\"></span></div><a href=\"/p/favorite.html\" class=\"item-action\"><span>View All</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a></div></div><div class=\"account-list-section\"><h3 class=\"section-header\">Settings & Data</h3><div class=\"account-list-item\"><span class=\"item-label\"><svg fill=\"#000000\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" class=\"icon flat-color\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><circle id=\"primary\" cx=\"12\" cy=\"12\" r=\"10\" style=\"fill: #fff;\"></circle><path id=\"secondary\" d=\"M22,12A10,10,0,0,1,12,22V2A10,10,0,0,1,22,12Z\" style=\"fill: var(--keycolor);\"></path></g></svg> Theme</span><a href=\"javascript:void(0)\" class=\"item-action\" id=\"open-theme-settings-modal-mobile\"><span class=\"item-value\">Customize</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a></div><div class=\"account-list-item mobile-only-setting\" id=\"safe-mode-button-mobile\"><span class=\"item-label\"><svg class='safe-mode-icon' fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' style=\"width: 20px; height: 20px; stroke: #fff;\"><path class='lightning' d='M8.12901 11.1313L12.128 6.1907C12.4408 5.80431 13.027 6.0448 13.027 6.55951V10.3836C13.027 10.6919 13.2569 10.9419 13.5405 10.9419H15.4855C15.9274 10.9419 16.1629 11.5083 15.871 11.8689L11.872 16.8095C11.5592 17.1959 10.973 16.9554 10.973 16.4407V12.6167C10.973 12.3083 10.7431 12.0584 10.4595 12.0584H8.51449C8.07264 12.0584 7.83711 11.4919 8.12901 11.1313Z' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5'/><path class='shield' d='M21 11.1835V8.28041C21 6.64041 21 5.82041 20.5959 5.28541C20.1918 4.75042 19.2781 4.49068 17.4507 3.97122C16.2022 3.61632 15.1016 3.18875 14.2223 2.79841C13.0234 2.26622 12.424 2.00012 12 2.00012C11.576 2.00012 10.9766 2.26622 9.77771 2.79841C8.89839 3.18875 7.79784 3.61619 6.54933 3.9711C4.72193 4.49056 3.80822 4.75029 3.40411 5.28529C3 5.82028 3 6.64029 3 8.28029V11.1833C3 16.8085 8.06277 20.1835 10.594 21.5194C11.2011 21.8398 11.5046 22 12 22C12.4954 22 12.7989 21.8398 13.406 21.5194C15.9372 20.1835 21 16.8085 21 11.1833Z' stroke-linecap='round' stroke-width='1.5'/></svg> Safe Mode</span><a href=\"javascript:void(0)\" class=\"item-action\"><span class=\"item-value toggle-status\" id=\"safe-mode-status-mobile\">Off</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a></div><div class=\"account-list-item\"><span class=\"item-label\"><svg fill=\"#fff\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><path id=\"secondary\" d=\"M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7m4,4v6\" style=\"fill: none; stroke: var(--keycolor); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path><path id=\"primary\" d=\"M4,7H20M17.07,20.07,18,7H6l.93,13.07a1,1,0,0,0,1,.93h8.14A1,1,0,0,0,17.07,20.07Z\" style=\"fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path></g></svg> Clear Cache</span><a href=\"javascript:void(0)\" class=\"item-action\" id=\"clear-cache-btn\"><span class=\"item-value\">0 KB</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a></div><div class=\"account-list-item\" id=\"logout-list-item\"><span class=\"item-label\"><svg fill=\"#fff\" width=\"20px\" height=\"20px\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><polyline id=\"secondary\" points=\"10 15 7 12 10 9\" style=\"fill: none; stroke: var(--keycolor); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></polyline><line id=\"secondary-2\" data-name=\"secondary\" x1=\"7\" y1=\"12\" x2=\"21\" y2=\"12\" style=\"fill: none; stroke: var(--keycolor); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></line><path id=\"primary\" d=\"M14,16v3a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V5A1,1,0,0,1,4,4h9a1,1,0,0,1,1,1V8\" style=\"fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path></g></svg> Logout</span><a href=\"javascript:void(0)\" class=\"item-action\" id=\"account-page-logout-btn\"><span class=\"item-value\">Proceed</span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path fill-rule=\"evenodd\" d=\"M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z\"/></svg></a></div></div></div>";
        let vLSdivClassavatarmodalo = "<div class=\"avatar-modal-overlay\" id=\"avatar-modal\"><div class=\"avatar-modal-box\"><div class=\"avatar-modal-header\"><h3>Choose Your Avatar</h3><button class=\"avatar-modal-close\" id=\"avatar-modal-close\">&times;</button></div><div class=\"avatar-category-tabs\" id=\"avatar-category-tabs\"></div><div class=\"avatar-grid\" id=\"avatar-grid\"></div></div></div>";
        v722.innerHTML = vLSdivClassaccountpagec;
        let v744 = localStorage.getItem("matureFilterActive") === "true";
        let v745 = document.getElementById("safe-mode-status-mobile");
        if (v745) {
          v745.textContent = v744 ? "On" : "Off";
        }
        if (v743) {
          v743.style.display = "flex";
          v722.querySelector(".account-page-container").appendChild(v743);
        }
        v722.insertAdjacentHTML("afterend", vLSdivClassavatarmodalo);
        let v746 = document.getElementById("account-page-avatar-img");
        let v747 = document.getElementById("account-page-name");
        let v748 = document.getElementById("account-page-username-value");
        let v749 = document.getElementById("account-page-avatar-preview-img");
        let v750 = document.getElementById("account-section-header");
        let v751 = document.getElementById("username-list-item");
        let v752 = document.getElementById("avatar-list-item");
        let v753 = document.getElementById("logout-list-item");
        let v754 = document.getElementById("my-content-section");
        let v755 = document.getElementById("edit-username-btn");
        let v756 = document.getElementById("clear-cache-btn");
        let v757 = document.getElementById("account-page-logout-btn");
        let v758 = document.getElementById("edit-avatar-btn");
        let v759 = document.getElementById("avatar-modal");
        let v760 = document.getElementById("avatar-modal-close");
        let v761 = document.getElementById("avatar-category-tabs");
        let v762 = document.getElementById("avatar-grid");
        let v763 = document.getElementById("open-theme-settings-modal-mobile");
        let v764 = document.getElementById("theme-settings-overlay");
        v758.addEventListener("click", () => {
          let v765 = JSON.parse(localStorage.getItem(vLSAbefilm_simple_user));
          if (v765 && !v765.isGuest) {
            vF92();
          }
        });
        v760.addEventListener("click", vF93);
        v759.addEventListener("click", p366 => {
          if (p366.target === v759) {
            vF93();
          }
        });
        v755.addEventListener("click", p367 => {
          p367.preventDefault();
          let v766 = JSON.parse(localStorage.getItem(vLSAbefilm_simple_user));
          if (!!v766 && !v766.isGuest) {
            showCustomPrompt("Edit Username", "Enter your new display name:", v766.name, p368 => {
              if (p368 && p368.trim() !== "") {
                v766.name = p368.trim();
                localStorage.setItem(vLSAbefilm_simple_user, JSON.stringify(v766));
                sessionStorage.setItem("showToastAfterReload", "Username updated successfully.");
                location.reload();
              } else if (p368 !== null) {
                showCustomAlert("Invalid Name", "Display name cannot be empty.");
              }
            });
          }
        });
        v756.addEventListener("click", p369 => {
          p369.preventDefault();
          showCustomConfirm("Confirm Clear Cache", "This will clear your watch history, favorites, and watchlist. Are you sure?", () => {
            let vA17 = [vLSAbefilm_simple_user, "sidebarState", "supabase_client_id"];
            for (let v767 = localStorage.length - 1; v767 >= 0; v767--) {
              let v768 = localStorage.key(v767);
              if (!vA17.includes(v768) && !v768.startsWith("slider_cache_")) {
                localStorage.removeItem(v768);
              }
            }
            sessionStorage.clear();
            sessionStorage.setItem("showToastAfterReload", "Cache has been cleared.");
            location.reload();
          });
        });
        v757.addEventListener("click", p370 => {
          p370.preventDefault();
          showCustomConfirm("Confirm Logout", "Are you sure you want to log out?", () => {
            localStorage.removeItem(vLSAbefilm_simple_user);
            sessionStorage.setItem("showToastAfterReload", "You have been logged out.");
            location.reload();
          });
        });
        if (v763 && v764) {
          v763.addEventListener("click", p371 => {
            p371.preventDefault();
            v764.style.display = "flex";
            setTimeout(() => v764.classList.add("is-visible"), 10);
          });
        }
        vF88();
        vF89();
        window.addEventListener("storage", p372 => {
          if (p372.key === vLSAbefilm_simple_user) {
            vF88();
          }
        });
      }
    }
    let v769 = document.getElementById("loginModalOverlay");
    let v770 = document.getElementById("user-logged-out");
    let v771 = document.getElementById("user-logged-in");
    function f59() {
      let v772 = JSON.parse(localStorage.getItem(vLSAbefilm_simple_user));
      if (v772 && v772.name) {
        let v773 = document.getElementById("loggedInUserName");
        let v774 = document.getElementById("userAvatar");
        let v775 = document.getElementById("modalUserName");
        let v776 = document.getElementById("modalUserAvatar");
        let v777 = v772.isGuest ? v563 : v772.avatar || v564;
        v773.textContent = v772.name;
        v774.src = v777;
        v775.textContent = v772.name;
        v776.src = v777;
        v771.classList.remove("hidden");
        v770.classList.add("hidden");
      } else {
        let v778 = document.getElementById("logged-out-avatar");
        let v779 = document.getElementById("logged-out-name");
        if (v778) {
          v778.src = v565;
        }
        if (v779) {
          v779.textContent = "Me";
        }
        v771.classList.add("hidden");
        v770.classList.remove("hidden");
      }
    }
    if (v769) {
      let vF94 = function () {
        v769.classList.remove("hidden");
        if (v783) {
          v783.focus();
        }
      };
      let vF95 = function () {
        v769.classList.add("hidden");
      };
      var vVF94 = vF94;
      var vVF95 = vF95;
      let v780 = document.getElementById("cancelLoginBtn");
      let v781 = document.getElementById("loginWithDisplayNameBtn");
      let v782 = document.getElementById("loginAsGuestBtn");
      let v783 = document.getElementById("displayNameInput");
      document.addEventListener("click", function (p373) {
        if (p373.target.id === "showLoginModalBtn" || p373.target.closest("#showLoginModalBtn")) {
          p373.preventDefault();
          vF94();
        }
      });
      if (v780) {
        v780.addEventListener("click", vF95);
      }
      v769.addEventListener("click", p374 => {
        if (p374.target === v769) {
          vF95();
        }
      });
      if (v781) {
        v781.addEventListener("click", () => {
          let v784 = v783.value.trim();
          if (v784) {
            localStorage.setItem(vLSAbefilm_simple_user, JSON.stringify({
              name: v784,
              isGuest: false
            }));
            sessionStorage.setItem("showToastAfterReload", "Logged in as " + v784);
            location.reload();
          } else if (window.showCustomAlert) {
            showCustomAlert("Login Error", "Please enter a display name.");
          } else {
            alert("Please enter a display name.");
          }
        });
      }
      if (v782) {
        v782.addEventListener("click", () => {
          localStorage.setItem(vLSAbefilm_simple_user, JSON.stringify({
            name: "Guest",
            isGuest: true
          }));
          sessionStorage.setItem("showToastAfterReload", "Logged in as Guest.");
          location.reload();
        });
      }
    }
    let v785 = document.getElementById("modalClearDataBtn");
    let v786 = document.getElementById("modalLogoutBtn");
    if (v786) {
      v786.addEventListener("click", p375 => {
        p375.preventDefault();
        if (window.showCustomConfirm) {
          showCustomConfirm("Confirm Logout", "Are you sure you want to log out?", () => {
            localStorage.removeItem(vLSAbefilm_simple_user);
            sessionStorage.setItem("showToastAfterReload", "You have been logged out.");
            location.reload();
          });
        }
      });
    }
    if (v785) {
      v785.addEventListener("click", p376 => {
        p376.preventDefault();
        if (window.showCustomConfirm) {
          showCustomConfirm("Confirm Clear Cache", "This will clear your watch history, favorites, and watchlist. Are you sure?", () => {
            let vA18 = [vLSAbefilm_simple_user, "sidebarState", "supabase_client_id"];
            for (let v787 = localStorage.length - 1; v787 >= 0; v787--) {
              let v788 = localStorage.key(v787);
              if (!vA18.includes(v788) && !v788.startsWith("slider_cache_")) {
                localStorage.removeItem(v788);
              }
            }
            sessionStorage.clear();
            sessionStorage.setItem("showToastAfterReload", "Cache has been cleared.");
            location.reload();
          });
        }
      });
    }
    let v789 = document.querySelectorAll("[data-panel-target]");
    let v790 = document.getElementById("notification-overlay");
    function f60(p377, p378) {
      let v791 = p377.getBoundingClientRect();
      let v792 = p378.offsetWidth;
      let v793 = v791.left + v791.width / 2;
      let v794 = v793 - v792 / 2;
      let vLN20 = 20;
      if (v794 < vLN20) {
        v794 = vLN20;
      }
      if (v794 + v792 > window.innerWidth - vLN20) {
        v794 = window.innerWidth - v792 - vLN20;
      }
      p378.style.left = v794 + "px";
      p378.style.right = "auto";
      p378.style.setProperty("--arrow-position-left", v793 - v794 + "px");
    }
    v789.forEach(p379 => {
      p379.addEventListener("click", function (p380) {
        p380.preventDefault();
        p380.stopPropagation();
        let v795 = this.getAttribute("data-panel-target");
        let v796 = document.querySelector(v795);
        if (!v796) {
          return;
        }
        let v797 = v796.classList.contains("is-visible");
        document.querySelectorAll(".header-dropdown-panel.is-visible").forEach(p381 => {
          if (p381 !== v796) {
            p381.classList.remove("is-visible");
          }
        });
        if (v790) {
          v790.classList.remove("is-visible");
        }
        if (!v797) {
          v796.classList.add("is-visible");
          if (v795 === "#notification-panel" && window.innerWidth <= 767 && v790) {
            v790.classList.add("is-visible");
          }
          if (window.innerWidth > 767) {
            f60(this, v796);
          }
          if (v795 === "#notification-panel") {
            let v798 = document.getElementById("notification-panel-content");
            let v799 = document.getElementById("header-notifications");
            if (v798 && v799) {
              v798.innerHTML = v799.innerHTML;
            }
          }
          if (v795 === "#history-panel" && typeof displayHistory == "function") {
            displayHistory();
          }
          if (v795 === "#watchlist-panel" && typeof renderWatchlistPanel == "function") {
            renderWatchlistPanel();
          }
        }
      });
    });
    document.addEventListener("click", function (p382) {
      if (!p382.target.closest("[data-panel-target]") && !p382.target.closest(".header-dropdown-panel")) {
        document.querySelectorAll(".header-dropdown-panel.is-visible").forEach(p383 => p383.classList.remove("is-visible"));
        if (v790) {
          v790.classList.remove("is-visible");
        }
      }
    });
    if (window.innerWidth > 767) {
      let v800;
      v789.forEach(p384 => {
        let v801 = p384.getAttribute("data-panel-target");
        let v802 = document.querySelector(v801);
        if (v802) {
          p384.addEventListener("mouseenter", () => {
            clearTimeout(v800);
            document.querySelectorAll(".header-dropdown-panel.is-visible").forEach(p385 => p385.classList.remove("is-visible"));
            f60(p384, v802);
            v802.classList.add("is-visible");
            if (v801 === "#notification-panel") {
              let v803 = document.getElementById("notification-panel-content");
              let v804 = document.getElementById("header-notifications");
              if (v803 && v804) {
                v803.innerHTML = v804.innerHTML;
              }
            }
            if (v801 === "#history-panel" && typeof displayHistory == "function") {
              displayHistory();
            }
            if (v801 === "#watchlist-panel" && typeof renderWatchlistPanel == "function") {
              renderWatchlistPanel();
            }
          });
          p384.addEventListener("mouseleave", () => {
            v800 = setTimeout(() => v802.classList.remove("is-visible"), 200);
          });
          v802.addEventListener("mouseenter", () => clearTimeout(v800));
          v802.addEventListener("mouseleave", () => v802.classList.remove("is-visible"));
        }
      });
    }
    let v805 = document.body;
    let v806 = document.getElementById("sidebarToggle");
    if (v806) {
      if (localStorage.getItem("sidebarState") === "collapsed") {
        v805.classList.add("sidebar-collapsed");
      }
      v805.classList.add("no-transition");
      setTimeout(() => {
        v805.classList.remove("no-transition");
      }, 100);
      v806.addEventListener("click", () => {
        v805.classList.toggle("sidebar-collapsed");
        let v807 = v805.classList.contains("sidebar-collapsed") ? "collapsed" : "expanded";
        localStorage.setItem("sidebarState", v807);
        setTimeout(function () {
          if (typeof $ !== "undefined" && $.fn.owlCarousel) {
            $("#dynamic-main-slider, #PopularPosts1 .owl-carousel").trigger("refresh.owl.carousel");
          }
        }, 350);
      });
    }
    let v808 = sessionStorage.getItem("showToastAfterReload");
    if (v808) {
      f55(v808);
      sessionStorage.removeItem("showToastAfterReload");
    }
    f53();
    f59();
    if (v560) {
      f54();
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    function f61() {
      var v809 = document.querySelector(".upcoming-carousel-wrapper");
      var v810 = document.getElementById("upcoming-carousel-widgets");
      var v811 = document.querySelector(".upcoming-carousel-section");
      if (!v809 || !v810 || !v811) {
        if (v811) {
          v811.style.display = "none";
        }
        return;
      }
      v809.id = "upcoming-carousel";
      var v812 = v810.querySelectorAll(".widget.Image");
      if (v812.length === 0) {
        v811.style.display = "none";
        return;
      }
      var vLS22 = "";
      const vO157 = {
        autoWidth: !0,
        stagePadding: 20,
        margin: 12
      };
      const vO160 = {
        "0": vO157,
        "768": {
          items: 2,
          slideBy: 2
        },
        "1200": {
          items: 3,
          slideBy: 3
        }
      };
      v812.forEach(function (p386) {
        if (p386.style.display !== "none" && !p386.classList.contains("hidden")) {
          var v813 = p386.querySelector(".hidden-widget-data");
          if (v813) {
            var v814 = (v813.querySelector(".data-title") || {}).textContent || "";
            var v815 = (v813.querySelector(".data-caption") || {}).textContent || "";
            var v816 = (p386.querySelector("a") || {}).href || "#";
            var v817 = (p386.querySelector("img") || {}).src || "";
            if (v817) {
              let v818 = /^\[(TV|Movie)\]\s*\[(.*?)\]\s*(.*)$/s;
              let v819 = v815.match(v818);
              let vLS23 = "";
              let vLS24 = "";
              let vV815 = v815;
              if (v819) {
                let v820 = v819[1];
                let v821 = v819[2].trim();
                vV815 = v819[3].trim();
                vLS23 = "<span class=\"upcoming-thumb-type " + (v820.toLowerCase() === "tv" ? "type-tv" : "type-movie") + "\">" + v820 + "</span>";
                if (v821) {
                  vLS24 = "<span class=\"upcoming-date\">" + v821 + "</span>";
                }
              }
              vLS22 += "<div class=\"item\"><a class=\"upcoming-card\" href=\"" + v816 + "\"><div class=\"upcoming-image\">" + vLS23 + "<img alt=\"" + v814 + "\" src=\"" + v817.replace(/\/s\d+(-[a-z0-9]+)*\//, "/w200-h300-c/") + "\" loading=\"lazy\"/></div><div class=\"upcoming-content\"><h4 class=\"upcoming-title\">" + v814 + "</h4>" + vLS24 + "<p class=\"upcoming-description\">" + vV815 + "</p><div class=\"upcoming-button\">More Details</div></div></a></div>";
            }
          }
        }
      });
      if (vLS22.trim() !== "") {
        v809.innerHTML = vLS22;
        $(v809).addClass("owl-carousel owl-theme").owlCarousel({
          loop: false,
          margin: 16,
          nav: true,
          dots: false,
          navText: ["<svg fill=\"none\" viewBox=\"0 0 24 24\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 18l-6-6 6-6\"/></svg>", "<svg fill=\"none\" viewBox=\"0 0 24 24\"><path stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 6l6 6-6 6\"/></svg>"],
          responsive: vO160
        });
      } else {
        v811.style.display = "none";
      }
    }
    if (window.jQuery && jQuery.fn.owlCarousel) {
      f61();
    } else {
      setTimeout(f61, 500);
    }
  });
  document.addEventListener("DOMContentLoaded", function () {
    let v822 = document.getElementById("mobile-genre-trigger");
    let v823 = document.getElementById("mobile-genre-sidebar");
    let v824 = document.getElementById("mobile-genre-overlay");
    let v825 = document.getElementById("mobile-genre-close");
    let v826 = document.getElementById("mobile-genre-list-container");
    if (v822 && v823 && v824 && v825 && v826) {
      let vF96 = () => {
        if (v826.children.length === 0) {
          let v827 = document.querySelector(".genre-dropdown-trigger .widget-content ul");
          if (v827) {
            let v828 = v827.cloneNode(!0);
            v828.className = "mobile-genre-list";
            v826.appendChild(v828);
          } else {
            v826.innerHTML = "<p style=\"color: #888;\">Could not load genres.</p>";
          }
        }
        document.body.classList.add("genre-sidebar-open");
      };
      let vF97 = () => {
        document.body.classList.remove("genre-sidebar-open");
      };
      v822.addEventListener("click", p387 => {
        p387.preventDefault();
        vF96();
      });
      v825.addEventListener("click", vF97);
      v824.addEventListener("click", vF97);
    }
  });
  (function () {
    let vLSAbeflix = "Abeflix";
    let vLSHttpspvefdmvjveyoelt = "https://pvefdmvjveyoeltewmli.supabase.co";
    let vLSEyJhbGciOiJIUzI1NiIs2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2ZWZkbXZqdmV5b2VsdGV3bWxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NDQxNDgsImV4cCI6MjA3MTQyMDE0OH0.RC4SNhUgpaNY0mIxjop4bdJeTVyAGKLYkXFTCNROCDw";
    let vLSHttpsabefilmofficial = "https://abefilmofficialzone.blogspot.com/p/registration.html";
    let vVLSHttpsabefilmofficial = vLSHttpsabefilmofficial;
    let vLN160 = 160;
    let v829 = !1;
    let v830 = localStorage.getItem("protectionEnabled") !== "false";
    let vF98 = () => localStorage.setItem("protectionEnabled", v830);
    let vF99 = () => {
      if (!!v830 && !v829) {
        v829 = true;
        window.location.replace(vVLSHttpsabefilmofficial);
      }
    };
    let v831 = !1;
    document.addEventListener("fullscreenchange", () => {
      v831 = !!document.fullscreenElement;
    });
    let vF100 = () => {
      if (!v830 || v831) {
        return;
      }
      let v832 = window.outerWidth - window.innerWidth;
      let v833 = window.outerHeight - window.innerHeight;
      if (v832 > vLN160 || v833 > vLN160) {
        vF99();
      }
    };
    window.addEventListener("resize", vF100);
    setInterval(vF100, 500);
    setInterval(() => {
      if (!v830) {
        return;
      }
      let v834 = new Date().getTime();
      debugger;
      if (new Date().getTime() - v834 > 100) {
        vF99();
      }
    }, 1000);
    document.addEventListener("contextmenu", p388 => {
      if (v830) {
        p388.preventDefault();
      }
    });
    document.addEventListener("keydown", p389 => {
      if (v830) {
        if (p389.key === "F12" || p389.keyCode === 123) {
          p389.preventDefault();
        }
        if (p389.ctrlKey && p389.shiftKey && (p389.key === "I" || p389.keyCode === 73)) {
          p389.preventDefault();
        }
        if (p389.ctrlKey && p389.shiftKey && (p389.key === "J" || p389.keyCode === 74)) {
          p389.preventDefault();
        }
        if (p389.ctrlKey && p389.shiftKey && (p389.key === "C" || p389.keyCode === 67)) {
          p389.preventDefault();
        }
        if (p389.ctrlKey && (p389.key === "U" || p389.keyCode === 85)) {
          p389.preventDefault();
        }
      }
    });
    document.addEventListener("keydown", p390 => {
      if (p390.ctrlKey && p390.shiftKey && p390.code === "Space") {
        if (prompt("Enter Admin Password:") === "adminpass123") {
          v830 = !v830;
          vF98();
          alert("Protection is now " + (v830 ? "ENABLED" : "DISABLED"));
        } else {
          alert("Wrong password!");
        }
      }
    });
    let vSetTimeout = setTimeout(() => {
      console.error("Watchdog triggered: License check did not complete successfully. Redirecting.");
      window.location.href = vLSHttpsabefilmofficial;
    }, 30000);
    document.addEventListener("DOMContentLoaded", function () {
      if (typeof supabase === "undefined") {
        console.error("Supabase library not found. Redirecting.");
        window.location.href = vLSHttpsabefilmofficial;
        return;
      }
      let {
        createClient: _0x376221
      } = supabase;
      let v_0x376221 = _0x376221(vLSHttpspvefdmvjveyoelt, vLSEyJhbGciOiJIUzI1NiIs2);
      function f62(p391) {
        if (!p391) {
          return "";
        }
        let v835 = p391.trim();
        v835 = v835.replace(/^(https?:\/\/)?/i, "");
        v835 = v835.replace(/^www\./i, "");
        v835 = v835.split("/")[0];
        v835 = v835.split("?")[0];
        return v835;
      }
      async function f63() {
        let vF622 = f62(window.location.hostname);
        try {
          const vO161 = {
            domain_to_check: vF622,
            theme_to_check: vLSAbeflix
          };
          let {
            data: _0x42c0ca,
            error: _0x1adca6
          } = await v_0x376221.rpc("check_license_for_theme", vO161);
          if (_0x1adca6) {
            throw new Error("Supabase RPC failed: " + _0x1adca6.message);
          }
          if (!_0x42c0ca || _0x42c0ca.length === 0) {
            console.error("License check failed: No valid license found. Redirecting.");
            window.location.href = vLSHttpsabefilmofficial;
            return;
          }
          let v836 = _0x42c0ca[0];
          let v837 = new Date();
          let v838 = new Date(v836.expiry_date);
          v838.setUTCHours(23, 59, 59, 999);
          if (v836.status !== "forever" && v838 < v837) {
            console.error("License expired. Redirecting.");
            window.location.href = vLSHttpsabefilmofficial;
            return;
          }
          clearTimeout(vSetTimeout);
          console.log("✅ License valid for " + vF622 + " | Watchdog disarmed.");
        } catch (e14) {
          console.error("License check process failed:", e14);
        }
      }
      f63();
    });
  })();
})();
