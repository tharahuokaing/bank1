/**
 * HUOKAING THARA - Multi-Language Engine
 * Handles UI translations for English, Khmer, Vietnamese, and French.
 */
(() => {
    "use strict";
        const translations = {
        en: {
            title: "CORE DEPOSIT & LIQUIDITY LEDGER",
            subtitle: "Huokaing Thara Banking System • System Monitoring Panel",
            refresh: "Re-Synchronize",
            totalCapital: "Total Liquid Capital",
            assetDist: "Deposit Asset Class Distribution",
            recentInflows: "Recent Institutional Inflows & Placements",
            th: ["Reference ID", "Account Tier", "Routing Type", "Amount", "Status"],
            withdrawTitle: "Funds Withdrawal",
            withdrawPlaceholder: "Enter amount...",
            withdrawBtn: "Execute Withdrawal"
        },
        km: {
            title: "បញ្ជីប្រាក់បញ្ញើ និងសាច់ប្រាក់ងាយស្រួលស្នូល",
            subtitle: "ប្រព័ន្ធធនាគារ ហួកាំងា ថារ៉ា • ត្រួតពិនិត្យប្រព័ន្ធ",
            refresh: "ធ្វើសមកាលកម្មឡើងវិញ",
            totalCapital: "សាច់ប្រាក់សរុប",
            assetDist: "ការចែកចាយប្រភេទទ្រព្យសកម្មបញ្ញើ",
            recentInflows: "លំហូរចូល និងការដាក់ប្រាក់ស្ថាប័នថ្មីៗ",
            th: ["លេខយោង", "កម្រិតគណនី", "ប្រភេទផ្លូវបញ្ជូន", "ចំនួនទឹកប្រាក់", "ស្ថានភាព"],
            withdrawTitle: "ការដកប្រាក់",
            withdrawPlaceholder: "បញ្ចូលចំនួនទឹកប្រាក់...",
            withdrawBtn: "បញ្ជាដកប្រាក់"
        },
        vi: {
            title: "SỔ CÁI TIỀN GỬI & THANH KHOẢN CỐT LÕI",
            subtitle: "Hệ thống Ngân hàng Huokaing Thara • Bảng Giám sát Hệ thống",
            refresh: "Đồng bộ lại",
            totalCapital: "Tổng Vốn Thanh Khoản",
            assetDist: "Phân bổ Loại tài sản Tiền gửi",
            recentInflows: "Dòng vốn Tổ chức & Khoản gửi Gần đây",
            th: ["Mã Tham chiếu", "Cấp Tài khoản", "Loại Định tuyến", "Số tiền", "Trạng thái"],
            withdrawTitle: "Rút Tiền",
            withdrawPlaceholder: "Nhập số tiền...",
            withdrawBtn: "Thực Hiện Rút Tiền"
        },
        fr: {
            title: "GRAND LIVRE DES DÉPÔTS ET DE LA LIQUIDITÉ",
            subtitle: "Système Bancaire Huokaing Thara • Panneau de Surveillance",
            refresh: "Resynchroniser",
            totalCapital: "Capital Liquide Total",
            assetDist: "Distribution des Classes d'Actifs de Dépôt",
            recentInflows: "Flux Institutionnels & Placements Récents",
            th: ["Réf. de Transaction", "Niveau de Compte", "Type de Routage", "Montant", "Statut"],
            withdrawTitle: "Retrait de Fonds",
            withdrawPlaceholder: "Entrer le montant...",
            withdrawBtn: "Exécuter le Retrait"
        }
    };

    const translations = {
        en: {
            title: "CORE DEPOSIT & LIQUIDITY LEDGER",
            subtitle: "Huokaing Thara Banking System • System Monitoring Panel",
            refresh: "Re-Synchronize",
            totalCapital: "Total Liquid Capital",
            assetDist: "Deposit Asset Class Distribution",
            recentInflows: "Recent Institutional Inflows & Placements",
            th: ["Reference ID", "Account Tier", "Routing Type", "Amount", "Status"],
            withdrawTitle: "Funds Withdrawal",
            withdrawPlaceholder: "Enter amount...",
            withdrawBtn: "Execute Withdrawal"
        },
        km: {
            title: "បញ្ជីប្រាក់បញ្ញើ និងសាច់ប្រាក់ងាយស្រួលស្នូល",
            subtitle: "ប្រព័ន្ធធនាគារ ហួកាំង ថារ៉ា • ត្រួតពិនិត្យប្រព័ន្ធ",
            refresh: "ធ្វើសមកាលកម្មឡើងវិញ",
            totalCapital: "សាច់ប្រាក់សរុប",
            assetDist: "ការចែកចាយប្រភេទទ្រព្យសកម្មបញ្ញើ",
            recentInflows: "លំហូរចូល និងការដាក់ប្រាក់ស្ថាប័នថ្មីៗ",
            th: ["លេខយោង", "កម្រិតគណនី", "ប្រភេទផ្លូវបញ្ជូន", "ចំនួនទឹកប្រាក់", "ស្ថានភាព"],
            withdrawTitle: "ការដកប្រាក់",
            withdrawPlaceholder: "បញ្ចូលចំនួនទឹកប្រាក់...",
            withdrawBtn: "បញ្ជាដកប្រាក់"
        },
        vi: {
            title: "SỔ CÁI TIỀN GỬI & THANH KHOẢN CỐT LÕI",
            subtitle: "Hệ thống Ngân hàng Huokaing Thara • Bảng Giám sát Hệ thống",
            refresh: "Đồng bộ lại",
            totalCapital: "Tổng Vốn Thanh Khoản",
            assetDist: "Phân bổ Loại tài sản Tiền gửi",
            recentInflows: "Dòng vốn Tổ chức & Khoản gửi Gần đây",
            th: ["Mã Tham chiếu", "Cấp Tài khoản", "Loại Định tuyến", "Số tiền", "Trạng thái"],
            withdrawTitle: "Rút Tiền",
            withdrawPlaceholder: "Nhập số tiền...",
            withdrawBtn: "Thực Hiện Rút Tiền"
        },
        fr: {
            title: "GRAND LIVRE DES DÉPÔTS ET DE LA LQUIDITÉ",
            subtitle: "Système Bancaire Huokaing Thara • Panneau de Surveillance",
            refresh: "Resynchroniser",
            totalCapital: "Capital Liquid Total",
            assetDist: "Distribution des Classes d'Actifs de Dépôt",
            recentInflows: "Flux Institutionnels & Placements Récents",
            th: ["Réf. de Transaction", "Niveau de Compte", "Type de Routage", "Montant", "Statut"],
            withdrawTitle: "Retrait de Fonds",
            withdrawPlaceholder: "Entrer le montant...",
            withdrawBtn: "Exécuter le Retrait"
        }
    };

    const LocalizationEngine = {
        setLanguage: (lang) => {
            const t = translations[lang];
            if (!t) return;

            // Update main elements by data attributes
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                if (t[key]) el.innerText = t[key];
            });

            // Update table headers specifically
            const thElements = document.querySelectorAll(".deposit-table th");
            thElements.forEach((th, index) => {
                if (t.th[index]) th.innerText = t.th[index];
            });

            // Update input placeholder
            const inputEl = document.getElementById("withdrawInput");
            if (inputEl) inputEl.placeholder = t.withdrawPlaceholder;

            localStorage.setItem("ht_lang", lang);
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        const savedLang = localStorage.getItem("ht_lang") || "en";
        LocalizationEngine.setLanguage(savedLang);
    });

    window.LocalizationEngine = LocalizationEngine;
})();
